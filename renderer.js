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
      NameAndPermissions.permissions = parsedContent["permissions"]
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