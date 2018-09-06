# Вводная архитектура клиентского приложения.
Здесь будет представлена полная документированная составляющая обсуждений, целей, предложений, архитектуры и тем связанных с клиентской частью проекта Array.io. 
<p align="center">
    <img src="logo.png" height="250px" width="250px" /> 
</p>

- [Manifest](manifest.md)
 
- [Общие Абстракции](shared/README.md)
  - [DApp Window Context](shared/dapp-window-context.md)
  - [Dependencies](shared/dependencies.md)
  - [Permissions](shared/permissions.md)
- [Top-Level API](shared/README.md)
  - [Activity](components/activity.md)
  - [Keychain](components/keychain.md)
- [Устаревшее](not-relevant/README.md)
  - [Изоляция окружений](not-relevant/isolation.md)
  - [SmartContract](not-relevant/contract.md)
  - [Loader](not-relevant/loader.md)

## Client documentation

- [Client front-end documentation](#client-front-end-documentation)
- [Architecture technical documentation](#architecture-technical-documentation)
  - [Events action signals](#events-action-signals)
  - [UUID target store resolver](#uuid-target-store-resolver)
  - [Redux middleware for permission check](#redux-middleware-for-permission-check)
  - [Component-channel resolver](#component-channel-resolver)
  - [Dapp communication protocol](#dapp-communication-protocol)
- [System components](#system-components)
  - [Local Storage](#local-storage)
  - [Ipfs Storage](#ipfs-storage)
  - [OrbitDb](#orbitdb)
  - [Logger](#logger)
  - [Keychain](#keychain)
- [Array library documentation](#array-library-documentation)
  - [array.dapp](#arraydapp)
  - [array.dapp.subscribe](#arraydappsubscribe)
  - [array.Ipc](#arrayipc)
    - [Dapp activity declarations](#dapp-activity-declarations)
  - [array.LocalStorage](#arraylocalstorage)
  - [array.IpfsStorage](#arrayipfsstorage)
  - [array.OrbitDb](#arrayorbitdb)
  - [array.Logger](#arraylogger)
  - [array.Keychain](#arraykeychain)


# Client front-end documentation

Main reason to use Redux-Observable / RxJs to halt work in the middle of the process (instead of Promise ignore way, which causes **CPU overhead**)

*A lot of people compare RxJS with promises and callbacks that can be chained together. You can compare them in a way but with the enormous difference* **promises/callbacks are unstoppable. Once a promise is triggered there is no way to stop them. Once fired they WILL end and call their callback method, if you want it or not, either in a successful way or in an error. Observables though are stoppable and can be called to a halt in the middle of its process.** 

## External references

https://github.com/piotrwitek/typesafe-actions<br />
https://electronjs.org/blog/typescript<br />
https://github.com/electron/electron-quick-start-typescript<br />
https://github.com/piotrwitek/react-redux-typescript-guide#action-creators<br />
https://github.com/mitsuruog/react-redux-observable-typescript-sample<br />
https://blog.mitsuruog.info/2018/03/react-redux-observable-typescript<br />
https://www.typescriptlang.org/docs/handbook/classes.html<br />
https://redux.js.org/<br />
<br />
Improve your front-end with RxJs https://axxes.com/en/frontend-en/rxjs-reinforcing-your-front-end/ <br />
Observables in Angular 2: https://angular.io/guide/observables <br />
RxJS 5 Thinking Reactively https://www.youtube.com/watch?v=3LKMwkuK0ZE <br />
Netflix JavaScript Talks - RxJS + Redux + React = Amazing! https://www.youtube.com/watch?v=AslncyG8whg <br />
Introduction to Redux-Observable https://www.youtube.com/watch?v=zk2bVBZhmcc <br />

# Architecture technical documentation

*TODO: Dynamic permission mechanizm*<br />
*If we change permissions on the fly. In this case, if the application is running, it is necessary to "load" the new permissions and, accordingly, the channels.*
Start-stop channels: https://github.com/MichaelVasseur/electron-ipc-bus

## Events action signals

Events action signals used in our architecture only to receive event signals when no related channels is opened. All component events go through channels `ipcMain`-`ipcRenderer` mechanizm.
 
## UUID target store resolver

![forwardToRendererWrapper middleware mechanizm](./diagrams/forwardToRendererWrapper.png?raw=true "forwardToRendererWrapper middleware mechanizm")

Each created renderer process (client, dapp) has own uniq identificator `UUID` passed to process `additionalParams`. So we can identify and map each process with uniq token id. It helps us to deliver action straight to renderer process with `UUID` mapped with dapp name in main process.  It is implemented with simple filter of passed array `globalUUIDList` (given `UUID` mapped to id of renderer and we can get `webContents` via `webContents.fromId(id)` electron method).


## Redux middleware for permission check

![Permission middleware](diagrams/permissionMiddleware.png?raw=true "Permission middleware")

Each dispatched action before it reaches target dapp go to main process and validate in `validatePermissionAction` middleware. Main process due to UUID identificators checks if action is passed by client or dapp and apply own validation rules for each group in a separate way.

![Permission middleware failure](diagrams/permissionMIddlewareFailure.png?raw=true "Permission middleware failure")


## Component-channel resolver

Resolve `CHANNEL_ID` for dapp renderer process to get data from **main process component** (ex. LocalStorage, Network, etc.). Each dapp has own uniq `CHANNEL_ID` even for the same components. 

Component-channel have events identificators to map requests to callbacks.

```
      Renderer                     |            Main
-----------------------------------------------------------------------
                                   |
  [payload] --> ([payload], id1) --|--> process [payload] --
                                   |                        |
  waiting (callback, id1) <--------|--- ([result], id1) ----
                                   |    
  (id1 == id1) => callback(result) |
```
1. Renderer pass payload
2. Create and save uniq id on renderer side
3. Pass (payload, id) map to main
4. Save id1 and map it to channel, UUID.
5. Process payload and get result
6. Retrieve saved id1, pass mapped (result, id1)
7. Renderer get (result, id1) map and compare with saved identificators.
8. Pass result to correspond callback function

![Resolve channelId](./diagrams/channelIdResolve.png?raw=true "Resolve channelId")

Each component will have a channel through which data will be sent. We use separate channels for security reasons. Before dapp process starts we check component access permissions in manifest file, create and pass channelIds to preload script. By that we add security layer on renderer side.

![Resolve channelId failure](./diagrams/channelIdResolveFailure.png?raw=true "Resolve channelId failure")


### Actions roadmap
- ask for permission before renderer process starts, add map to main process:
```javascript
{ channelProposal: 'PERMISSION/PROPOSAL', channelId: 'CHANNEL_ID'}
```
- When renderer init data sending through channel he pass action, preload script add payload:
```javascript
{ type: 'INTENT_CHANNEL_DATA_PASS', payload: { uuid: '[UUID_RECEIVER_RENDERER]', channelProposal: '[PERMISSION/PROPOSAL]' } }
```

- Main process validate `UUID` and resolve `CHANNEL_ID`, publish action: 
```javascript
  { type: 'ACCEPT_CHANNEL_DATA_PASS', payload: { channelId: '[CHANNEL_ID]', uuid: '[UUID_RECEIVER_RENDERER]' } }
```
- Renderer pass data through given `CHANNEL_ID`


## Dapp communication protocol

Each dapp can init communication with another dapp. Under the hood sender dapp dispatch `INTENT_OPEN_CHANNELS` action, which will cause handshake processing algorithm on the main side. See the details on the diagrams below.

![Dapp communication success scenario](./diagrams/DappCommunication.png?raw=true "Dapp communication success scenario")

Sender and receiver channels binding:<br/>
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


### Actions roadmap

Sender dapp init communication with receiver dapp (`openChannelIntent` action). Main process propagate signal and dispatch two `openChannel` actions. [UUID target store resolver](#uuid-target-store-resolver) is used to pass action to the certain renderer process. Next we start procedure of bindChannels binding (`bindChannels` action dispatch). On success scenario we bind opened channels together and dispatch `bindChannelsSuccess`. So finally, we ready to provide communication abstraction for dapp developer  - `Ipc` instance.

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
- bindChannelsSuccess (bind channels successfully done)
```javascript
{ type: 'BIND_OPEN_CHANNELS_DONE', payload: { bindChannelId: '[BIND_CHANNLE_ID]', uuid: ['[UUID_RECEIVER_RENDERER_1]', '[UUID_RECEIVER_RENDERER_2]'] }
```
- bindChannelsFailure (failed to bind channels)

- cancelChannel trigger on dapp close, unsubscribe, etc.
```javascript
{ type: 'CANCEL_OPENED_CHANNEL' }
```

#### Links
 https://www.i2b2.org/software/projects/datarepo/CRC_Architecture_10.pdf

# System components

System components are isolated for security reasons proxy classes (wrapper classes in some cases), which provide operations with File System, Network, IPFS, Wallet, Keychain, etc.

# Local Storage

Allow to store local data currently in renderer process browserWindow. Local Storage is useful for applications that store a large amount of data (for example, a catalog of DVDs in a lending library) and applications that don't need persistent internet connectivity to work.
 
After Local Storage permission granted and dapp process started we provide ready to initialize instance of PouchDb storage with IndexedDb adapter.

## Permissions signal sequence (success scenario)
1. Dapp user init instance `new LocalStorage()`
2. Dapp redux store disaptches `INTENT_CHANNEL_DATA_PASS(LOCALSTORAGE)`
3. Main process orchestrate and accept data passing `ACCEPT_CHANNEL_DATA_PASS`
4. Create wrapper class with corresponding data manipulation methods. Class  `new LocalStorage()` extends `PouchDb` class with `IndexedDb` adapter.


## External refferences:
https://pouchdb.com<br>
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB<br/>

-------------------------

# Ipfs Storage

Main responsibility of Ipfs Storage component is to store data in IPFS. It provides clean pool of methods to store data.

> IPFS is a distributed file system that seeks to connect all computing devices with the same system of files. In some ways, this is similar to the original aims of the Web, but IPFS is actually more similar to a single bittorrent swarm exchanging git objects. You can read more about its origins in the paper [IPFS - Content Addressed, Versioned, P2P File System](https://github.com/ipfs/ipfs/blob/master/papers/ipfs-cap2pfs/ipfs-p2p-file-system.pdf?raw=true).

 Ipfs Storage is useful for applications that want to store/backup a large amount of data, keep data decentralized at the same time. In other words it is File System for your dapp.
 
## Permissions signal sequence (success scenario)
1. Dapp user init instance `new IpfsStorage()`
2. Dapp redux store disaptches `INTENT_CHANNEL_DATA_PASS(IPFS)`
3. Main process orchestrate and accept data passing `ACCEPT_CHANNEL_DATA_PASS(CHANNEL_ID)`
4. Create proxy class `new IpfsStorage()` with corresponding data manipulation methods. Proxy class resposible to send and listen for events propagated by `IPFS` class at main process. 
 
## External refferences:
https://github.com/ipfs/ipfs<br/>
 
# OrbitDb
 
Simply speaking, OrbitDb component, being a layer of abstraction under IPFS provide P2P sync between stores. We use those possibilites to work with broadcasting channels in IPFS. For example, we can `create` broadcasting channel, subscribe to feed via `connect` method, or propogate messages via `broadcast` method.

> OrbitDB is a serverless, distributed, peer-to-peer database. OrbitDB uses [IPFS](https://ipfs.io/) as its data storage and [IPFS Pubsub](https://github.com/ipfs/go-ipfs/blob/master/core/commands/pubsub.go#L23) to automatically sync databases with peers. It's an eventually consistent database that uses CRDTs for conflict-free database merges making OrbitDB an excellent choice for decentralized apps (dApps), blockchain applications and offline-first web applications.

## Permissions signal sequence (success scenario)
1. Dapp user init instance `new OrbitDb()`
2. Dapp redux store disaptches `INTENT_CHANNEL_DATA_PASS(ORBIT)`
3. Main process orchestrate and accept data passing `ACCEPT_CHANNEL_DATA_PASS(CHANNEL_ID)`
4. Create proxy class `new OrbitDb()` with corresponding data manipulation methods. Proxy class resposible to send and listen for events propagated by `OrbitDb` class at main process. 
 
## External refferences:
https://github.com/orbitdb/orbit-db<br/>

# Logger

Logger component provide logging. It intercept main process system errors and save it in `sqlite` database.

## Permissions signal sequence (success scenario)
1. Dapp user init instance `new Logger()`
2. Dapp redux store disaptches `INTENT_CHANNEL_DATA_PASS(LOGGER)`
3. Main process orchestrate and accept data passing `ACCEPT_CHANNEL_DATA_PASS(CHANNEL_ID)`
4. Create proxy class `new Logger()` with corresponding data manipulation methods. Proxy class resposible to send and listen for events propagated by `Logger` class at main process. 
 
## External refferences:
ORM for sqlite https://github.com/sequelize/sequelize<br/>
Winston logger https://github.com/winstonjs/winston

# Keychain

Keychain component provide transaction signing methods. It uses third-party Keychain application for keys manipulations and signing. Client app uses connection bridge to pass data in and out.

## Permissions signal sequence (success scenario)
1. Dapp user init instance `new Keychain()`
2. Dapp redux store disaptches `INTENT_CHANNEL_DATA_PASS(KEYCHAIN)`
3. Main process orchestrate and accept data passing `ACCEPT_CHANNEL_DATA_PASS(CHANNEL_ID)`
4. Create proxy class `new Keychain()` with corresponding data manipulation methods. Proxy class resposible to send and listen for events propagated by `Keychain` class at main process. 
 
## External refferences:
ORM for sqlite https://github.com/sequelize/sequelize<br/>
Winston logger https://github.com/winstonjs/winston


# Array library documentation

```
array
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

 other methods to work with components // todo orbitdb, bitshares, network, ipfs/p2p, keychain, localstorage  // subscribe


# array.dapp
The `array.dapp` object control your decentralized application event lifecycle.

## Events
 
The `dapp` object emits the following events:

### Event: 'will-finish-launching'
Emitted when the application has finished basic startup.

### Event: 'foreground'
Emitted when the application has changed state to foreground. User works with your dapp.

### Event: 'background'
Emitted when the application has changed state to background. User currently works with another dapp.

### Event: 'quit'
Returns:

* `event` Event
* `exitCode` Integer

Emitted when the application is quitting.


# array.dapp.subscribe 
The `array.dapp.subscribe` function lets you subscribe to specific events your dapp depends on. All components classes under the hood use `dapp.subscribe` with certain subscription type.

```
array.dapp.subscribe(type [, options] [, callback]);
```
Parameters
----------

1. ``String`` - The subscription, you want to subscribe to.
2. ``Mixed`` - (optional) Optional additional parameters, depending on the subscription type.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription, and the subscription itself as 3 parameter.
 
Returns
-------

``EventEmitter`` - A Subscription instance

Example
-------

```javascript
    var subscription = array.dapp.subscribe('pendingTransactions', function(error, result) {
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

To help array integrate into all kind of projects with different standards we provide multiple ways to act on asynchronous functions.

Most array.js objects allow a callback as the last parameter, as well as returning promises to chain functions.

Promise combined with an event emitter allow acting on different stages of action.

PromiEvents work like a normal promises with added on, once and off functions. This way developers can watch for additional events.


# array.Ipc
Communicate asynchronously from the your dapp process to another dapp.
The `Ipc` module is an instance of the `EventEmitter` class. It provides a few methods so you can:
* send synchronous and asynchronous messages from your dapp to another
* handle asynchronous and synchronous messages sent from other dapps. Messages sent from other dapp will be emitted to this module.
    
Parameters
----------

1. ``String`` - Dapp communication receiver name, you want talk to, `null` to handle messages only.

Returns
-------

``EventEmitter`` - A Subscription instance

Example
-------

```javascript
  const { Ipc } = require('array');
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

To simplify and formalize dapp communication protocol dapp developers able to declare **activities**. So another dapp developers can use those declarations in a clear way.

Example:
--------
```javascript
  const { Ipc } = require('array');
  const dComm = new Ipc('dappName');
  const { dFunc1, dFunc2 } = dComm; // 'dappName' dapp activities
  
  let res = await dFunc1('12345', 10);
  let res2 = await dFunc2('Test func 2');
   
```
#### Links
https://github.com/arrayio/docs.array.io/blob/master/ru_RU/src/components/activity.md


# array.FileManager

FileManager class provide secure way for local user files managing, encapsulates permissions mechanizms. Also provide methods for resourse effective file handling.
FileManager as a FileReader wrapper with restricted paths.


File upload with progress bar example:
https://github.com/linonetwo/ipfs-uploader-browser/blob/master/src/FileUpload.js
https://developer.mozilla.org/en-US/docs/Web/API/FileReader

Unrestricted File Upload
https://www.owasp.org/index.php/Unrestricted_File_Upload

Reading text and binary data with Node.js readable streams http://codewinds.com/blog/2013-08-04-nodejs-readable-streams.html

# array.LocalStorage
Local Storage is useful for dapps that want to store data on client side.

The `LocalStorage` module provides methods so you can 

* Create storage instance via `localDb = new LocalStorage()` and close it `localDb.close()`
* Create a document `localDb.post(payload, [callback])`
* Fetch a document `localDb.get(payloadId, [callback])`
* Delete a document `localDb.remove(payloadId, [callback])` or `localDb.remove(payload, [callback])`

`callback` are optional. If you don’t specify a `callback`, then the API returns a promise. 
 
Example usage
-------------

```javascript
  const { LocalStorage } = require('array');
  localDb = new LocalStorage();
  try {
    var response = await localDb.post({ data: 'save me please!' });
  } catch (err) {
    console.log(err);
  }
```

# array.IpfsStorage
The `IpfsStorage` module provides methods so you can store data in IPFS.

* Create instance via `ipfs = new IpfsStorage()`  
* Save file in ipfs `ipfs.transfer(filePath, kbSize, callback)`
 
`ipfs` instance of class that inherits from `EventEmitter`. It helps us to monitor file transfering status through `event`'s triggering.

Example usage
-------------

```javascript
const { IpfsStorage, FileManager } = require('array');
let videoInstance = new FileManager('./video.avi');
let ipfs = new IpfsStorage();
let response = ipfs.transfer(videoInstance, 1000, function(error, result) {
  if (!error) { console.log(result); }
})
.on("process", function() {
  console.log('Yoohoo! Another 1000 KB uploaded successfully!');
}); 
```
# array.OrbitDb
The `OrbitDb` module provides methods to work with broadcasting channels in IPFS. For example, we can `create` broadcasting channel, subscribe to feed via `connect` method, or propogate messages via `broadcast` method.

* Create database instance via `orbit = new OrbitDb()`  
* `//next todo`
 
Example usage
-------------

```javascript
  const { OrbitDb } = require('array');
  ipfs = new OrbitDb();
 
```
# array.Logger
The `Logger` module provides methods to log `debug`, `info`, `warning`, `error` messages. 

* Create logger instance via `log = new Logger()`  
* Different logging levels like: `log.info(payload, callback)`
 
Example usage
-------------

```javascript
  const { Logger } = require('array');
  log = new Logger();
  log.info('Dapp started!', function(error, result) {
    if (!error) { console.log(result); }
  });
```

# array.Keychain
The `Keychain` module provides methods to work with transaction signing.
So you can:
* Create new keys
* Sign transactions with a key
* View a list of all available keys
* View the default for the current DApp key.
 
`Keychain` class instance that inherits from `EventEmitter`. It helps us to monitor file transfering status through `event`'s triggering.

Example usage
-------------

```javascript
const { Keychain } = require('array');
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
https://github.com/arrayio/docs.array.io/blob/master/ru_RU/src/components/keychain.md



## External references
[Electron app](https://electronjs.org/docs/api/app) <br />
[Electron source code](https://github.com/electron/electron/search?q=continue-activity&unscoped_q=continue-activity) <br />
web3 events api: <br />
 https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html?highlight=eventEmitter
 https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=eventEmitter
 https://github.com/ethereum/web3.js/blob/develop/lib/web3.js
