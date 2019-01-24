declare module 'logger' {
  export = Logger;
}

declare var logger: Logger;

interface Logger {
  log(...args: any[]): void;

  error(...args: any[]): void;

  warn(...args: any[]): void;
}
