"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var redux_observable_1 = require("redux-observable");
var operators_1 = require("rxjs/operators");
var fileManagerActions = require("../actions/fileManager");
var constants = require("../constants");
var showOpenDialog = function () { return new Promise(function (resolve, reject) {
    electron_1.remote.dialog.showOpenDialog({ properties: ['openFile'] }, function (fileList) {
        console.log('HANDLE', fileList);
        resolve(fileList);
    });
}); };
var ipfsTestEpic = function (action$) { return action$.pipe(redux_observable_1.ofType(constants.INTENT_IPFS_FILE_LOADING), operators_1.tap(function (action) { return console.log('ACTION', action); }), operators_1.mapTo(fileManagerActions.openDialog())); };
var fileManagerEpic = function (action$) { return action$.pipe(redux_observable_1.ofType(constants.FILE_MANAGER_OPEN_DIALOG), operators_1.switchMap(function () { return showOpenDialog(); }), operators_1.map(function (file) { return fileManagerActions.openDialogSuccess(); }), operators_1.catchError(function (error) { return fileManagerActions.openDialogFailure(); })); };
exports.default = redux_observable_1.combineEpics(ipfsTestEpic, fileManagerEpic);
