import { ChildProcess, spawn } from "child_process";
import { EOL } from "os";

export const RESPONSE_TIMEOUT = 1000;
export const MAX_RETRIES = 3;

export interface Task {
  command: "CMD_CREATE" | "CMD_SIGN" | "CMD_LIST";
  params?: any;
  promise: {
    resolve: any,
    reject: any,
  };
}

export class TaskProcess {
  public task: Task;
  public retries: number;
  private queue: Queue;

  constructor(queue: Queue, task: Task) {
    this.retries = MAX_RETRIES;
    this.queue = queue;
    this.task = task;
  }

  public async run(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { stdin, stdout } = this.queue.keychain;
      const { keychain } = this.queue;

      keychain.on("close", (code: number, signal: string) => {
        // self clean
        cleanup();

        let error: Error;
        if (code !== null) {
          this.retries--;
          error = new Error(`keychain process exited with code (retry ${MAX_RETRIES - this.retries}): ${code}`);
        } else {
          this.retries = 0;
          error = new Error(`keychain process abnormally terminated by signal: ${signal}`);
        }

        (error as any).normal = false;
        reject(error);
      });

      const cleanup = () => {
        stdout.removeListener("data", handleResult);
        stdout.removeListener("error", handleError);
        stdin.removeListener("error", handleError);

        keychain.removeAllListeners();
      };

      const handleError = (error: Error) => {
        (error as any).normal = true;
        cleanup();
        reject(error);
      };

      const handleResult = (response: string) => {
        const deserialized = JSON.parse(response);

        if (deserialized.error) {
          handleError(new Error(deserialized.error));
        } else {
          cleanup();
          resolve(deserialized.result);
        }
      };

      stdout.addListener("data", handleResult);
      stdout.addListener("error", handleError);
      stdin.addListener("error", handleError);

      const serialized = JSON.stringify(this.task);
      await stdin.write(serialized);
      await stdin.write(EOL);
      stdin.end();
    });
  }
}

export class Queue {
  private activeProcess?: TaskProcess;
  public keychain: ChildProcess;
  private queue: Task[];
  private path: string;

  constructor(path: string) {
    this.keychain = spawn(path);
    this.path = path;
    this.queue = [];
  }

  public push(task: Task) {
    this.queue.push(task);

    if (!this.activeProcess) {
      this.next();
    }
  }

  private async next() {
    if (!this.activeProcess) {
      const task = this.queue.shift();

      if (task) {
        this.activeProcess = new TaskProcess(this, task);

        getter_loop: while (true) {
          try {
            const result = await this.activeProcess.run();
            this.activeProcess.task.promise.resolve(result);
            break getter_loop;
          } catch (error) {
            if (!error.normal) {
              // Restart daemon
              this.keychain = spawn(this.path);

              if (!this.activeProcess.retries) {
                this.activeProcess.task.promise.reject(error);
                break getter_loop;
              }
            } else {
              this.activeProcess.task.promise.reject(error);
              break getter_loop;
            }
          }
        }

        this.activeProcess = undefined;
        this.next();
      }
    }
  }
}
