import { EOL } from 'os';
import { Queue, Task } from './queue';

export const MAX_RETRIES = 3;

class TaskProcess {
  public task: Task;
  public retries: number;
  private queue: Queue;

  constructor(queue: Queue, task: Task) {
    this.retries = MAX_RETRIES;
    this.queue = queue;
    this.task = task;
  }

  public async run(): Promise<any> {

    const { stdin, stdout } = this.queue.keychain;
    const { keychain } = this.queue;

    return new Promise(async (resolve, reject) => {
      keychain.on('close', (code: number, signal: string) => {
        // self clean
        cleanup();
        let error: Error;
        if (code !== null) {
          this.retries = this.retries - 1;
          error = new Error(`keychain process exited with code (retry ${MAX_RETRIES - this.retries}): ${code}`);
        } else {
          this.retries = 0;
          error = new Error(`keychain process abnormally terminated by signal: ${signal}`);
        }

        (error as any).normal = false;
        reject(error);
      });

      const cleanup = () => {
        stdout.removeListener('data', handleResult);
        stdout.removeListener('error', handleError);
        stdin.removeListener('error', handleError);

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

      stdout.addListener('data', handleResult);
      stdout.addListener('error', handleError);
      stdin.addListener('error', handleError);

      const serialized = JSON.stringify(this.task);
      await stdin.write(serialized);
      await stdin.write(EOL);
      stdin.end();
    });
  }
}

export { TaskProcess };
