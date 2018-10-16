export class Logger {

  async writeToConsole(message: string) {
    console.log("WriteToConsole message: ", message);
    return message;
  }

}
