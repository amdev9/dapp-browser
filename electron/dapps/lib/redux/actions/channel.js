"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dapp communication protocol
exports.INTENT_OPEN_CHANNELS = 'INTENT_OPEN_CHANNELS';
exports.OPEN_CHANNEL = 'OPEN_CHANNEL';
exports.OPEN_CHANNEL_SUCCESS = 'OPEN_CHANNEL_SUCCESS';
exports.BIND_OPEN_CHANNELS_DONE = 'BIND_OPEN_CHANNELS_DONE';
// Events API protocol
exports.INIT_EVENT_SUBSCRIPTION = 'INIT_EVENT_SUBSCRIPTION';
exports.EVENT_TRIGGERED = 'EVENT_TRIGGERED';
exports.EVENT_RECEIVED = 'EVENT_RECEIVED';
// Component-channel resolver
exports.INTENT_CHANNEL_DATA_PASS = 'INTENT_CHANNEL_DATA_PASS';
exports.ACCEPT_CHANNEL_DATA_PASS = 'ACCEPT_CHANNEL_DATA_PASS';
exports.INTENT_IPFS_FILE_LOADING = 'INTENT_IPFS_FILE_LOADING';
function openChannelIntent() {
    return {
        type: exports.INTENT_OPEN_CHANNELS
    };
}
exports.openChannelIntent = openChannelIntent;
exports.intentIpfsFileLoading = function () { return ({
    type: exports.INTENT_IPFS_FILE_LOADING
}); };
