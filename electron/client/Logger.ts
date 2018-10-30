export class Logger {

  static messages:string[] = [];

  static writeToConsole(message: string) {
    Logger.messages.push(message);
  }

}
