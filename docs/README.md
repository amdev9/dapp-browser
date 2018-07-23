## Client documentation

- [Client front-end documentation](#client-front-end-documentation)
  - [External references](#external-references)
- [Architecture technical documentation](#architecture-technical-documentation)
  - [UUID target store resolver](#uuid-target-store-resolver)
  - [Redux middleware for permission check](#redux-middleware-for-permission-check)
  - [Dapp communication protocol](#dapp-communication-protocol)
  - [Events API protocol](#events-api-protocol)
  - [Component-channel resolver](#component-channel-resolver)
- [Array library documentation](#array-library-documentation)
  - [array.dapp](#arraydapp)
  - [array.dapp.subscribe](#arraydappsubscribe)
  - [array.Ipc](#arrayipc)
  - *... other components related array.[component].[method]*

# Client front-end documentation

Main reason to use Redux-Observable / RxJs to halt work in the middle of the process (instead of Promise ignore way, which causes **CPU overhead**)

*A lot of people compare RxJS with promises and callbacks that can be chained together. You can compare them in a way but with the enormous difference* **promises/callbacks are unstoppable. Once a promise is triggered there is no way to stop them. Once fired they WILL end and call their callback method, if you want it or not, either in a successful way or in an error. Observables though are stoppable and can be called to a halt in the middle of its process.** 

## External references

*Links*:
https://github.com/piotrwitek/typesafe-actions
https://electronjs.org/blog/typescript
https://github.com/electron/electron-quick-start-typescript
https://github.com/piotrwitek/react-redux-typescript-guide#action-creators
https://github.com/mitsuruog/react-redux-observable-typescript-sample
https://blog.mitsuruog.info/2018/03/react-redux-observable-typescript
https://www.typescriptlang.org/docs/handbook/classes.html
https://redux.js.org/

Improve your front-end with RxJs https://axxes.com/en/frontend-en/rxjs-reinforcing-your-front-end/ <br />
Observables in Angular 2: https://angular.io/guide/observables <br />
RxJS 5 Thinking Reactively https://www.youtube.com/watch?v=3LKMwkuK0ZE <br />
Netflix JavaScript Talks - RxJS + Redux + React = Amazing! https://www.youtube.com/watch?v=AslncyG8whg <br />
Introduction to Redux-Observable https://www.youtube.com/watch?v=zk2bVBZhmcc <br />

# Architecture technical documentation

*TODO: Permission mechanizm*

If we change permissions on the fly. In this case, if the application is running, it is necessary to "load" the new permissions and, accordingly, the channels.

## UUID target store resolver

![forwardToRendererWrapper middleware mechanizm](./diagrams/forwardToRendererWrapper.png?raw=true "forwardToRendererWrapper middleware mechanizm")

Each created renderer process (client, dapp) has own uniq identificator `UUID` passed to process `additionalParams`. So we can identify and map each process with uniq token id. It helps us to deliver action straight to renderer process with `UUID` mapped with dapp name in main process.  It is implemented with simple filter of passed array `globalUUIDList` (given `UUID` mapped to id of renderer and we can get `webContents` via `webContents.fromId(id)` electron method).

-------------------------

## Redux middleware for permission check

![Permission middleware](diagrams/permissionMiddleware.png?raw=true "Permission middleware")

Each dispatched action before it reaches target dapp go to main process and validate in `validatePermissionAction` middleware. Main process due to UUID identificators checks if action is passed by client or dapp and apply own validation rules for each group in a separate way.

![Permission middleware failure](diagrams/permissionMIddlewareFailure.png?raw=true "Permission middleware failure")

-------------------------

## Dapp communication protocol

![Dapp communication](./diagrams/DappCommunication.png?raw=true "Dapp communication")

![Dapp communication failure](./diagrams/DappCommunicationFailure.png?raw=true "Dapp communication failure")


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

-------------------------

## Events API protocol

Events API protocol used in our architecture only to receive event signals. As a transport for event's data we use channels and [Component-channel resolver](#component-channel-resolver) mechanizm.

As you remember all actions (without `scope: local` electron-redux flag) are firstly dispatched in main process store. Renderer process (dapp) init action `INIT_EVENT_SUBSCRIPTION` with specified in payload actions to subscribe. On the main process side we have variable `eventMap` to store map with subscribed actions.

<!-- Add EVENT_ACCEPT ??? Failure logic -->

![Events mechanizm](./diagrams/eventsMechanizm.png?raw=true "Events mechanizm")

![Events mechanizm failure](./diagrams/eventsMechanizmFailure.png?raw=true "Events mechanizm failure")


### Local Storage actions roadmap
- ask for permission before renderer process starts, add map to main process:

```javascript
{ channelProposal: '[PERMISSION/PROPOSAL]', channelId: '[CHANNEL_ID]'}
```

- Renderer init subscription ex: 

```javascript 
{ type: 'INIT_EVENT_SUBSCRIPTION', payload: { channelProposal: '[PERMISSION/PROPOSAL]', additionalParams: {...} } }
```

- Main process add event trigger condition to own side map (`eventMap`), check if action passed through main contains in `eventMap`.

- Event triggered action: 

```javascript
{ type: 'EVENT_TRIGGERED', payload: { channelProposal: '[PERMISSION/PROPOSAL]', triggered: { type: { 'LOCAL_STORAGE_SET_SUCCESS', payload: {...} } } } }
```

- Renderer answer: 

```javascript
{ type: 'EVENT_RECEIVED', payload: channelProposal: '[PERMISSION/PROPOSAL]', additionalParams: {...} }
```
- Now render can init opening channel for data passing, etc.

-------------------------

## Component-channel resolver

Resolve `CHANNEL_ID` for dapp renderer process to get   data from **main process component** (ex. LocalStorage, BitShares, etc.). Each dapp has own uniq `CHANNEL_ID` even for the same components:

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

------------------------

#### Links
 https://www.i2b2.org/software/projects/datarepo/CRC_Architecture_10.pdf

# Array library documentation

```
array
|- dapp -|
|        |- subscribe
|
|- Ipc
|- LocalStorage -| _methods_
|- Keychain -----| _methods_
|- IpfsStorage --| _methods_
|- OrbitDb ------| _methods_
|- Network ------| _methods_
|- *...other components*
```

 other methods to work with components // todo orbitdb, bitshares, network, ipfs/p2p, keychain, localstorage  // subscribe


# array.dapp
The `array.dapp` object control your decentralized application event lifecycle.

Events
------
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
The `array.dapp.subscribe` function lets you subscribe to specific events your dapp depends on.

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
## Callbacks Promises Events (experimental)

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
  var senderDappComm = new Ipc('receiverDappName');
  
  senderDappComm.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
  })
  
  senderDappComm.on('synchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
  })
```

#### Links
[Electron app](https://electronjs.org/docs/api/app) <br />
[Electron source code](https://github.com/electron/electron/search?q=continue-activity&unscoped_q=continue-activity) <br />
web3 events api: <br />
 https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html?highlight=eventEmitter
 https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=eventEmitter
 https://github.com/ethereum/web3.js/blob/develop/lib/web3.js
