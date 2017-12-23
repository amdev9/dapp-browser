const vm2 = require("vm");

const name2 = "dapp2";

document.addEventListener("DOMContentLoaded", function() {
  var but = document.getElementById("testButton2");
  but.addEventListener("click", function() {
    if (
      window.nameAndPermissionsObject &&
      window.nameAndPermissionsObject.name === name2
    ) {
      var obj = window.nameAndPermissionsObject.permissions.reduce(function(
        key,
        value
      ) {
        key[value] = require(value);
        return key;
      },
      {});

      let result = vm2.runInNewContext(
        `
              
          var text = function(){
        return fs.readFileSync('./../LarkDapp/dapps/dapp1/test.txt','utf8');
     }
     text();    
          
          `,
        obj
      );

      var fileDetails = document.getElementById("fileDetails2");
      fileDetails.innerText = result;
    }
  });
});

