const isProduction = process.env.NODE_ENV === "production";

const log = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};
const warn = (...args) => {
  if (!isProduction) {
    console.warn(...args);
  }
};
const info = (...args) => {
  if (!isProduction) {
    console.info(...args);
  }
};
const error = (...args) => {
  if (!isProduction) {
    console.error(...args);
  }
};

export {
  log,
  warn,
  info,
  error,
}
