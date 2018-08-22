//@todo move code to main process

var fs = require('fs');
var path = require('path');


// export type AppItem = {
//   id?: number;
//   appName: string;
//   icon: string;
//   statusIcon: string[];
// }

class AppsManager {
  constructor() {
    this.id = 1; // auto generate identificator
    this.appName = '';
    this.icon = '';
    this.permissions = [];
    this.getAppItem = this.getAppItem.bind(this);
  }
  getAppItem (appName) {
    // return appItem
  }
}

// read contents of folder (for global folder)
// read contens of dapp folder

fs.readdir(__dirname, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
}) 

// parse manifest file
var filepath = path.join(__dirname, 'example.json');

fs.readFile(filepath, (err, fileContents) => {
  if (err) throw err;
  try {
    var jsonFile = JSON.parse(fileContents);
    console.log(jsonFile);


  } catch(err) {
    if(err instanceof SyntaxError) {
      console.log('Please check your js syntax: \n'); //@todo put it into console logs
      console.log(err);
    } else {
      console.log('other error: ', err);
    }
  }
});

 

