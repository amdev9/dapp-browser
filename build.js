const NwBuilder = require("nw-builder");

const include = ["./**", "./*.js", "./*.json", "./*.html", "./*.plist"];

const exclude = [
  "!./build.js",
  "!./build.win.js",
  "!./array.exe",
  "!./package-lock.json",
  "!./cache/**",
  "!./dist/**",
  "!./views/**",
  "!./assets/vendors/**",
  "!./assets/js/vue/**",
  "!./assets/i18n/**",
  "!./assets/webpack.js",
  "!./assets/webpack.less",
  "!./test.html",
  "!./webpack.config.js",
  "!./setup.win.iss",
  "!./index.win.js",
  "!./gitignore"
];

const files = include.concat(exclude);

const object = new NwBuilder({
  appName: "Array.IO",
  files: files,
  platforms: ["osx64"],
  buildDir: "./dist",
  flavor: "normal", // normal, sdk
  macPlist: "./Info.plist",
  macIcns: "./app.icns"
});

object.build(function(error) {
  if (error) return console.error(error);
  console.log("Complete !");
});
