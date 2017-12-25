const path = require("path");
const fs = require("fs");
const dir = require("node-dir");

const dirpath = path.join(__dirname, "/dapps/");

const NameAndPermissions = {};

function clicked(id) {
  let appPath = dirpath + id;
  dir.readFiles(
    appPath,
    {
      match: /manifest.json$/
    },
    function(err, content, next) {
      if (err) throw err;
      let parsedContent = JSON.parse(content);
      NameAndPermissions.name = parsedContent["name"];
      NameAndPermissions.permissions = parsedContent["permissions"];
      window.nameAndPermissionsObject = NameAndPermissions;
      // console.log(NameAndPermissions);
      next();
    },
    function(err, files) {
      if (err) throw err;
      // console.log("finished reading files:", files);
    }
  );
}

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener(
    "click",
    function(e) {
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
    },
    true
  );
});
