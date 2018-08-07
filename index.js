
const proc = require('child_process')
const electron = require('./electron/main/node_modules/electron')

console.log("path to electron: " + electron)
console.log("dirname: " + __dirname)


/*
	It is CRITICAL that you run electron with the --enable-sandbox on the MAIN process.
	If you do not do this, then the OS-enforced sandbox is NOT ENABLED.
	Your code will not be sandboxed without this flag.

	Hence we spawn the process here.
*/

let child;
if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT mode\nproc.spawn should execute: ' + electron + __dirname + "/electron/main/dist/main.js");
  child = proc.spawn(electron , [/*"--enable-sandbox",*/ __dirname + "/electron/main/dist/main.js"]  )
} else {
  console.log('PRODUCTION mode\nproc.spawn should execute: ' + electron + '--enable-sandbox' + __dirname + "/electron/main/dist/main.js");
  child = proc.spawn(electron , ["--enable-sandbox", __dirname + "/electron/main/dist/main.js"]  )
}
/* Catch the outputs of the electron child process */
child.stdout.on('data', (data) => {
  console.log(`[electron] ${data}`);
});

child.stderr.on('data', (data) => {
  console.log(`[electron] stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`[electron] about to exit with code: ${code}`);
});


// on exit of this process
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
