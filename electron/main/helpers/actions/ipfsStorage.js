"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typesafe_actions_1 = require("typesafe-actions");
var constants = require("../constants");
exports.ipfsUploadFilesSuccess = function (entryList, targetUUID) {
    return typesafe_actions_1.action(constants.IPFS_STORAGE_UPLOAD_FILES_SUCCESS, entryList, targetUUID);
};
exports.ipfsUploadFilesFailure = function (error, targetUUID) {
    return typesafe_actions_1.action(constants.IPFS_STORAGE_UPLOAD_FILES_FAILURE, error, targetUUID);
};
exports.openDialog = function () {
    return typesafe_actions_1.action(constants.FILE_MANAGER_OPEN_DIALOG);
};
