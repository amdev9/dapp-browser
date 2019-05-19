
# Client documentation

- [Architecture](#architecture)
  - [Infrastructure description](#infrastructure-description)
  - [Client front-end](#client-front-end)
  - [UUID store resolver](#uuid-store-resolver)
  - [Redux middleware for permission check](#redux-middleware-for-permission-check)
  - [Dapp communication protocol](#dapp-communication-protocol)
- [System components](#system-components)
  - [Local Storage](#local-storage)
  - [Ipfs Storage](#ipfs-storage)
  - [OrbitDb](#orbitdb)
  - [Logger](#logger)
  - [Keychain](#keychain)
  - [Network](#network)
- [DappIO library documentation](#dappio-library-documentation)
  - [dappio.dapp](#dappiodapp)
  - [dappio.dapp.subscribe](#dappiodappsubscribe)
  - [dappio.Ipc](#dappioipc)
    - [Dapp activity declarations](#dapp-activity-declarations)
  - [dappio.LocalStorage](#dappiolocalstorage)
  - [dappio.IpfsStorage](#dappioipfsstorage)
  - [dappio.OrbitDb](#dappioorbitdb)
  - [dappio.Logger](#dappiologger)
  - [dappio.Keychain](#dappiokeychain)
  - [dappio.Network](#dappionetwork)


# Architecture  

## Infrastructure description

```
   [sandbox - BrowserWindow]
              *           [chromium]
        ipc   *   ---------------------------
     ------>  *  |    * * * * * * *         |
    |         *  |    *  -------  *         |
    |         *  |    * |       | *         |
 [Main]<----  *  |    * |  Dapp | *         |
        ipc   *  |    *  -------  *         |
              *  |    * * * * * * *         |
              *  | [sandbox - BrowserView]  |
              *   ---------------------------
              *
```
 
The client is launched inside the [sandboxed](https://slack.engineering/interops-labyrinth-sharing-code-between-web-electron-apps-f9474d62eccc) [BrowserWindow](https://slack.engineering/growing-pains-migrating-slacks-desktop-app-to-browserview-2759690d9c7b).  
Dapps are launched inside the sandboxed BrowserView. When you launch a dapp for the first time, we create a BrowserWindow for it. At some point, you're going to have multiple BrowserViews in which the dapps are running. We are going to keep them around the memory, detached from the BrowserWindow. Then switching workspaces is just an additional call to `setBrowserView`. 

[Sandboxed](https://electronjs.org/docs/api/sandbox-option) [BrowserView](https://github.com/electron/electron/blob/master/docs/api/browser-view.md):
> It behaves more like a Chrome tab than the webview does
It’s used more like a native window than a DOM element
What we mean by that is — unlike the webview — you can’t drop a BrowserView into the DOM and manipulate it with CSS. 
Similar to top-level windows, these views can only be created from the background Node process. 

Each BrowserView process stores its own state in Redux and sets it up with a smart middleware called [electron-redux](https://github.com/hardchor/electron-redux):
> It uses Electron’s IPC to bounce actions between processes, like so:
If an action is dispatched in a renderer process, that renderer ignores it and forwards it to the main process
If an action is dispatched in the main process, it is handled there first, then replayed in the renderers
This makes the main process’ store the One True Store, and ensures that the others are eventually consistent. 
With this strategy, there’s no need to shuttle state or get into the serialization game. 

DAPPIO solves the side-effects of the Redux asynchronous actions with [redux-observable]( https://github.com/redux-observable/redux-observable)
> It becomes really powerful when combined with a Redux store in each process, 
because now we can kickoff main process side-effects from a renderer and vice-versa, 
in a decoupled way. It’s similar to an event bus or pub-sub, but across Chromium processes.

-----------------------------------------------------------------------

DAPPIO stack: 
- Electron.js (sandboxed BrowserWindow and BrowserViews, safe hardcoded list ipc communication channels)
- React.js
- Redux + redux-electron
- Rx + redux-observable
- TypeScript  

Links:
------

- BrowserWindow sandbox boilerplates https://github.com/kewde/electron-sandbox-boilerplate <br />
- Reducing desktop app memory footprint: https://slack.engineering/reducing-slacks-memory-footprint-4480fec7e8eb 


## Client front-end  

The main reason to use Redux-Observable / RxJs is that it allows to halt the process at any time (unlike the 'Promise ignore' way which causes **CPU overhead**)

*Many people compare RxJS with promises and callbacks that can be chained together. They could be compared to a certain extent but they have numerous differences, at the same time* **promises/callbacks are unstoppable**. Once a promise is triggered, there is no way to stop it. Once it is fired, is WILL inevitably end and call the callback method. It happens whether you want it or not either successfully or in an error. Unlike promises/callbacks, observables are stoppable and can be called to a halt DURING any process.** 

## External references



## Next releases improvements

Dynamic permission mechanizm<br />
*In case we change permissions on the fly, if the application is running, it is necessary to "load" the new permissions and, accordingly, the channels.*
Start-stop channels: https://github.com/MichaelVasseur/electron-ipc-bus
 
## UUID store resolver

![forwardToRendererWrapper middleware mechanizm](./diagrams/forwardToRendererWrapper.png?raw=true "forwardToRendererWrapper middleware mechanizm")

A `UUID` is a unique identifier that is given to a renderer process in `aditionalParams`. With the help of `UUID` we can identify and map every process with a unique token ID. This way an action is delivered directly to the renderer process and then passed to the main process where a given `UUID` is mapped with a dapp name. It is implemented by filtering an dappio `globalUUIDlist` and choosing a pair 'name - ID' from it. When `UUID` is given to a renderer ID, it becomes possible to acсess `webContents` via `webContents.fromID(id)` Electron method. 


## Redux middleware for permission check

![Permission middleware](diagrams/permissionMiddleware.png?raw=true "Permission middleware")

Each dispatched action, before it reaches the target dapp, is passed to the main process in the middleware where it is validated by `validatePermissionAction`. The main process checks whether the action was passed by the client or by a dapp according to its `UUID`. When the source is defined, the main process applies source-specific validation rules to the process.

![Permission middleware failure](diagrams/permissionMIddlewareFailure.png?raw=true "Permission middleware failure")

## Dapp communication protocol

Each dapp can initiate communication with another dapp. The sender dapp dispatches `INTENT_OPEN_CHANNELS` action which triggers a handshake processing algorithm on the main side. See the details in the diagram below.

![Dapp communication success scenario](./diagrams/DappCommunication.png?raw=true "Dapp communication success scenario")

Binding the sender and receiver channels:<br/>
Sender `ipcRenderer` <-`[CHANNEL_ID_SENDER]`-> `ipcMain` <-`[CHANNEL_ID_RECEIVER]`-> Receiver `ipcRenderer`
```javascript

ipcMain.on('[CHANNEL_ID_SENDER]', (event, payload) => {
  dappBrowserViewReceiver.webContents.send('[CHANNEL_ID_RECEIVER]', payload)
})

ipcMain.on('[CHANNEL_ID_RECEIVER]', (event, payload) => {
  dappBrowserViewSender.webContents.send('[CHANNEL_ID_SENDER]', payload)
})
```

![Dapp communication failure scenario](./diagrams/DappCommunicationFailure.png?raw=true "Dapp communication failure scenario")

After successful dapp communication handshake we init electron-redux stores with channelId `CHANNEL_ID_SENDER`, `CHANNEL_ID_RECEIVER`. Redux action used as main protocol in communication. 

### Actions roadmap

The sender dapp initiates communication with the receiver dapp through the `openChannelIntent` action. The main process propagates a signal and dispatches two `openChannel` actions. [UUID target store resolver](#uuid-target-store-resolver) is used to pass action to a certain renderer process. Next we bind the channels by dispatching an action `bindChannels`. If it turns out a success, we bind the opened channels and dispatch `bindChannelsSuccess`. As a result, we provide a dapp developer with a dapp communication abstraction - an `Ipc` instance.

- openChannelIntent 
```javascript
{ type: 'INTENT_OPEN_CHANNELS', channelProposal: "[PERMISSION/PROPOSAL]", targetDapp: "[TARGET_DAPP_NAME]" }
```
- openChannel
```javascript
{ type: 'OPEN_CHANNEL', payload: { channelId: '[CHANNEL_ID]', uuid: '[UUID_RECEIVER_RENDERER]'}
```

- bindChannels
```javascript
{ type: 'BIND_OPEN_CHANNELS', payload: { channelIds: ['[CHANNEL_ID_1]', '[CHANNEL_ID_2]'] }
```
- bindChannelsSuccess (when the binding was successful)
```javascript
{ type: 'BIND_OPEN_CHANNELS_DONE', payload: { bindChannelId: '[BIND_CHANNLE_ID]', uuid: ['[UUID_RECEIVER_RENDERER_1]', '[UUID_RECEIVER_RENDERER_2]'] }
```
- bindChannelsFailure (failed to bind the channels)

- cancelChannel (triggers dapp close, unsubscribe, etc.)
```javascript
{ type: 'CANCEL_OPENED_CHANNEL' }
```

#### Links
 https://www.i2b2.org/software/projects/datarepo/CRC_Architecture_10.pdf

# System components

System components are proxy classes and wrapper classes that are isolated for security reasons. They include Local Storage, IPFS, Keychain, and many more.

# Local Storage

Allow dapp to persist data which have to be accessed on dapp initialization (settings, game scores, chat room's list etc.).
For large amounts of data have to use [IPFS component](#dappioipfsstorage).
 
-------------------------

# IPFS Storage

IPFS provides a decentralized approach to data storage. That is why it is particularly useful for dapps. With IPFS you can backup and store large amounts of data without the absolute control of the Internet. A web of resilient networks allows IPFS to make the data accessible offline and keep it decentralized. 

> IPFS is a distributed file system that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but IPFS is actually more similar to a single bittorrent swarm exchanging git objects. You can read more about its origins in the paper [IPFS - Content Addressed, Versioned, P2P File System](https://github.com/ipfs/ipfs/blob/master/papers/ipfs-cap2pfs/ipfs-p2p-file-system.pdf?raw=true).

## Permissions signal sequence (success scenario)

Create a proxy class `new IpfsStorage()` with the corresponding data manipulation methods. A proxy class is resposible for sending and listening for the events propagated by `IPFS` class in the main process. 
 
## External refferences:
https://github.com/ipfs/ipfs<br/>
 
# OrbitDb
 
OrbitDB is an abstraction layer below IPFS, that provides P2P sycnchronization between the stores. We use it to interact with the broadcasting channels in IPFS. For example, we can use it to `create` a broadcasting channel and subscribe to feed via the `connect` method or propagate messages via the `broadcast` method. 

> OrbitDB is a serverless, distributed, peer-to-peer database. OrbitDB uses [IPFS](https://ipfs.io/) as its data storage and [IPFS Pubsub](https://github.com/ipfs/go-ipfs/blob/master/core/commands/pubsub.go#L23) to automatically sync databases with peers. It's an eventually consistent database that uses CRDTs for conflict-free database merges making OrbitDB an excellent choice for decentralized apps (dApps), blockchain applications and offline-first web applications.

## Permissions signal sequence (Success scenario)
1. Dapp developer initiates instance `new OrbitDb()`
2. Create a proxy class `new OrbitDb()` with the corresponding data manipulation methods. A proxy class is resposible for sending and listening for events propagated by `OrbitDb` class in the main process. 
 
## External refferences:
https://github.com/orbitdb/orbit-db<br/>

# Logger

Logger component provides the platform for logging. It intercepts system errors in the main process and saves the information about them in `sqlite` database.

## Permissions signal sequence (Success scenario)
1. Dapp developer init instance `new Logger()`
2. Create a proxy class `new Logger()` with the corresponding data manipulation methods. A proxy class is resposible for sending and listening for events propagated by `Logger` class in the main process. 
 
## External refferences:
ORM for sqlite https://github.com/sequelize/sequelize<br/>
Winston logger https://github.com/winstonjs/winston

# Keychain

Keychain component provides transaction signing methods. It uses third-party Keychain application for  various key manipulations and signing. Client app uses connection bridge to pass data in and out.

## Permissions signal sequence (success scenario)
1. Dapp developer initiates instance `new Keychain()`
2. Create a proxy class `new Keychain()` with the corresponding data manipulation methods. A proxy class is resposible for sending and listening for events propagated by `Keychain` class in the main process. 
 
# Network

For proceed network queries with blockchain node. Make JSON-RPC calls to blockchain node. Network component can work with different blockchain nodes - DAPPIO, bitshares, ethereum, etc.


## Permissions signal sequence (success scenario)
1. Dapp developer initiates instance `new Network()`
2. Create a proxy class `new Network()` with the corresponding data manipulation methods. A proxy class is resposible for sending and listening for events propagated by `Network` class in the main process. 
 
 

# DappIO library documentation

```
dappio
|- dapp -|
|        |- subscribe
|
|- Ipc
|- FileManager
|- LocalStorage  
|- IpfsStorage 
|- OrbitDb 
|- Logger
|- Keychain
|- Network 
```


# dappio.dapp
The `dappio.dapp` object controls your dapp's event lifecycle.

## Events
 
The `dapp` object emits the following events:

### Event: 'will-finish-launching'
Emitted when the application has finished basic startup.

### Event: 'foreground'
Emitted when the application has changed state to foreground. This means that the user works with your dapp.

### Event: 'background'
Emitted when the application has changed state to background. This means that the user currently works with another dapp.

### Event: 'quit'
Returns:

* `event` Event
* `exitCode` Integer

Emitted when the user quits the application.


# dappio.dapp.subscribe 
The `dappio.dapp.subscribe` function lets you subscribe to specific events your dapp depends on. Every component class uses `dapp.subscribe` with a certain subscription type.

```
dappio.dapp.subscribe(type [, options] [, callback]);
```
Parameters
----------

1. ``String`` - The subscription you want to subscribe to.
2. ``Mixed`` - (optional) Optional additional parameters differenciated according to a subscription type.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription, and the subscription itself is the third parameter.
 
Returns
-------

``EventEmitter`` - A Subscription instance

Example
-------

```javascript
    var subscription = dappio.dapp.subscribe('pendingTransactions', function(error, result) {
        if (!error) { console.log(result); }
    })
    .on("data", function(transaction) {
        console.log(transaction);
    });
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success) {
        if(success) { console.log('Successfully unsubscribed!'); }
    });
```
## Callbacks Promises Events

To help DAPPIO integrate into all kinds of projects with different standards, we provide various approaches to work with asynchronous functions.

Most dappio.js objects allow a callback as the last parameter, as well as returning promises to the chain functions.

A promise combined with an event emitter allows you to interfere with the process during any stage of action.

PromiEvents work like ordinary promises with the added 'on', 'once' and 'off' functions. This way developers can watch for additional events.

# dappio.Ipc
This module allows you to communicate asynchronously between two dapp processes.
The `Ipc` module is an instance of the `EventEmitter` class. It provides a few methods which enable you to:
* send synchronous and asynchronous messages from one dapp to another
* handle asynchronous and synchronous messages sent from other dapps. Messages sent from another dapp will be emitted from this module.
    
Parameters
----------

1. ``String`` - The name of the dapp communication receiver you want talk to; `null` to handle messages only.

Returns
-------

``EventEmitter`` - A Subscription instance

Example
-------

```javascript
  const { Ipc } = require('dappio');
  const dComm = new Ipc('dappName');
  
  dComm.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
  })
  
  dComm.on('synchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
  })
```
  
## Dapp activity declarations

To simplify and formalize the dapp communication protocol dapp, developers were able to declare **activities**. As a result, other dapp developers can use those declarations in their pure form.

Example:
--------
```javascript
  const { Ipc } = require('dappio');
  const dComm = new Ipc('dappName');
  const { dFunc1, dFunc2 } = dComm; // 'dappName' dapp activities
  
  let res = await dFunc1('12345', 10);
  let res2 = await dFunc2('Test func 2');
   
```
#### Links
https://github.com/dappioio/docs.dappio.io/blob/master/ru_RU/src/components/activity.md


# dappio.FileManager

The FileManager class provides a secure approach to the local user files management. It encapsulates permission mechanizms and incorporates methods for resource-effiecient file handling.

We use electron module `dialog` to secure path from dapp renderer process. Dapp develper pass command via our api to give oportunity dapp user select file from his filesystem. Main process handle real path and pass back unique identificator which help represent file abstraction in dapp process.


Example usage
-------------

```javascript
const { FileManager } = require('dappio');
let fmanager = new FileManager();
let videoInstance = await fmanager.openFileDialog(); // request filepath from dapp user 
```

#### Links: 
> The Dialog is opened from Electron's main thread.
https://electronjs.org/docs/api/dialog


# dappio.LocalStorage
Local Storage gives you the opportunity to persist data. 
We use `redux-persist` in combination with `SQLite`. 

# dappio.IpfsStorage
`IpfsStorage` lets you interact with the IPFS storage.

* Create instance via `ipfs = new IpfsStorage()`  
* Save file in IPFS `ipfs.transfer(filePath, kbSize, callback)`
 
`ipfs` is an instance of the class that inherits from `EventEmitter`. It helps us to monitor file transfer status by triggering `event`.

Example usage
-------------

```javascript
const { IpfsStorage, FileManager } = require('dappio');
let fmanager = new FileManager();
let videoInstance = await fmanager.openFileDialog(); // request filepath from dapp user 
let ipfs = new IpfsStorage();
let response = ipfs.transfer(videoInstance, 1000, function(error, result) {
  if (!error) { console.log(result); }
})
.on("process", function() {
  console.log('Yoohoo! Another 1000 KB uploaded successfully!');
}); 
```
# dappio.OrbitDb
The `OrbitDb` module is a collection of methods that enable you to work with broadcasting channels in IPFS. For example, we can `create` a broadcasting channel, subscribe to feed via `connect` method, or propogate messages via `broadcast` method.

* Create database instance via `orbit = new OrbitDb()`  
* `//next todo`
 
Example usage
-------------

```javascript
  const { OrbitDb } = require('dappio');
  ipfs = new OrbitDb();
 
```
# dappio.Logger
The `Logger` module provides methods for logging such messages, as `debug`, `info`, `warning`, `error`. 

* Create logger instance via `log = new Logger()`  
* Different logging levels, such as `log.info(payload, callback)`
 
Example usage
-------------

```javascript
  const { Logger } = require('dappio');
  log = new Logger();
  log.info('Dapp started!', function(error, result) {
    if (!error) { console.log(result); }
  });
```

# dappio.Keychain
The `Keychain` module provides the methods to work with transaction signing.
They enable you to:
* Create new keys
* Sign transactions with a key
* View a list of all available keys
* View the default for the current dapp key.
 
`Keychain` class instance that inherits from `EventEmitter`. It helps us to monitor the status of a file transfer by triggering `event`.

Example usage
-------------

```javascript
const { Keychain } = require('dappio');
kchain = new Keychain();
// client usage
const keyname = "my_awesome_key";
let createdKey = await kchain.create(key: keyname, algorithm: "AES256", curve: "SECP256K1");
// dapp usage
let signed = await kchain.sign(
  "de5f4d8974715e20f47c8bb609547c9e66b0b9e31d521199b3d8",
  "871689d060721b5cec5a010080841e00000000000011130065cd1d0000000000000000"
);
```
#### Links
https://github.com/dappioio/docs.dappio.io/blob/master/ru_RU/src/components/keychain.md


# dappio.Network
The `Network` module proceed network queries with blockchain node. Dapp developer can pass specific blockchain node name to `Network` class constructor.

Module provide methods to:
* get witness by ID
* get block
* get serialized data
 
`Network` class instance that inherits from `EventEmitter`. It helps us to monitor the status of a file transfer by triggering `event`.

Example usage
-------------

```javascript
const { Network } = require('dappio');
let net = new Network('bitshares'); // proceed network queries with blockchain node - 'bitshares' node here
let witnessId = 'de5f4d8974715e20f47c8bb609547c9e66b0b9e31d521199b3d8';
let witness = await net.getWitnessByID(witnessId);
```
 


## External references
[Electron app](https://electronjs.org/docs/api/app) <br />
[Electron source code](https://github.com/electron/electron/search?q=continue-activity&unscoped_q=continue-activity) <br />
web3 events api: <br />
 https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html?highlight=eventEmitter
 https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=eventEmitter
 https://github.com/ethereum/web3.js/blob/develop/lib/web3.js

 