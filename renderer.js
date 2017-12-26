const path = require("path");
const fs = require("fs");
const dir = require("node-dir");
const vm = require("vm");

const dirpath = path.join(__dirname, "/dapps/");

// const NameAndPermissions = {};

function clicked(id) {
  let appPath = dirpath + id;
  dir.readFiles(
    appPath,
    {
      match: /controller.js$/
    },
    function(err, content, next) {
      if (err) throw err;
      let result = vm.runInNewContext(content,{document});
      // console.log(result)
      next();
    },
    function(err, files) {
      if (err) throw err;
    }
  );
}

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener(
    "click",
    function(e) {
      if(e.target.href)
      {
        let link = e.target.href.toLowerCase();
      if (
        link.startsWith("http") ||
        link.startsWith("https") ||
        link.startsWith("www")
      ) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(function() {}, 100);
        return false;
      }
      return true;
      }
    },
    true
  );
});
