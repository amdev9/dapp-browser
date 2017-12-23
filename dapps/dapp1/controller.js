const vm = require("vm");

const name = "dapp1";

document.addEventListener("DOMContentLoaded", function() {
  var but = document.getElementById("testButton");
  but.addEventListener("click", function() {
    if (
      window.nameAndPermissionsObject &&
      window.nameAndPermissionsObject.name === name
    ) {
      var obj = window.nameAndPermissionsObject.permissions.reduce(function(
        key,
        value
      ) {
        key[value] = require(value);
        return key;
      },
      {});

      let result = vm.runInNewContext(
        `
              
          var text = function(){
        return fs.readFileSync('./../LarkDapp/dapps/dapp1/test.txt','utf8');
     }
     text();    
          
          `,
        obj
      );

      var fileDetails = document.getElementById("fileDetails");
      fileDetails.innerText = result;
    }
  });
});

