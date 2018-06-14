var s = window.ipc;

// // SECURITY TEST
// /* * 
//    * Real format:
//    * s.send('rpc-communicate', 'broadcast', 'broadcast message from BV2'); 
//    * */
// function sendMutation() {
// 	s.send('rpc-communicate', 'broadcast', 'mutated message from BV2');
// }
// s.send = sendMutation;
//

s.on('rpc-communicate', (event, text) => {
    document.getElementById("messageId").value = text;
});

function sendValidIpcMessage() {
    // start the rpc
    var firstTest = s.sendSync('rpc-start', 'from view 1', 'browserview');
    alert(firstTest);
}

function sendEvilIpcMessage() {

    // document.getElementById("messageId").value = 
    s.remoteStore();
    // s.sendSync('ELECTRON_BROWSER_GET_BUILTIN', 'app');
    /* evil channel, blocked */
}