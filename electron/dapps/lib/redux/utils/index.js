"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertContentIntoBlock = function (content) {
    if (content === void 0) { content = ''; }
    var blockId = 'entryIdsBlock';
    var buttonId = 'openDialogButton';
    var blockElement = document.getElementById(blockId);
    var buttonElement = document.getElementById(buttonId);
    if (!content) {
        return;
    }
    if (blockElement) {
        blockElement.innerText = content;
    }
    else {
        var textElement = document.createElement('div');
        textElement.id = blockId;
        textElement.innerText = content;
        buttonElement.parentNode.insertBefore(textElement, buttonElement.nextSibling);
    }
};
