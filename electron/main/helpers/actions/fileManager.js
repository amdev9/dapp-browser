"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("../constants");
exports.openDialogSuccess = function () { return ({
    type: constants.FILE_MANAGER_OPEN_DIALOG_SUCCESS
}); };
exports.openDialogFailure = function () { return ({
    type: constants.FILE_MANAGER_OPEN_DIALOG_FAILURE
}); };
exports.openDialog = function () { return ({
    type: constants.FILE_MANAGER_OPEN_DIALOG
}); };
