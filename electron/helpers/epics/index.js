

// add epic INTENT_OPEN_CHANNELS: [name of app] (resolve id of dapp, send push event) 
// - if resonse from subscribed dapp == OK
// - -> OPEN_CHANNELS -> when opened succesfully -> BIND_OPEN_CHANNELS
// - -> CHANNELS_OPENED (action signal for ipcCommunicator object start accept data transfer
// - takeUntil CANCEL_OPEN_CHANNEL 
    