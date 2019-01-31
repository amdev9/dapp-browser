const isDev = process.env.ELECTRON_ENV === 'development';

export const log = (...args: any[]) => {
  if (isDev) {
    console.log(...args);
  }
};

export const error = (...args: any[]) => {
  if (isDev) {
    console.error(...args);
  }
};

export const warn = (...args: any[]) => {
  if (isDev) {
    console.warn(...args);
  }
};
