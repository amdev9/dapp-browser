# Architecture technical documentation

## UUID target store resolver

![alt text](./diagrams/forwardToRendererWrapper.png?raw=true "forwardToRendererWrapper middleware mechanizm")

Each created renderer process (client, dapp) has own uniq identificator `UUID` passed to process `additionalParams`. So we can identify and map each process with uniq token id. `replayToRenderer` reply only to renderer with given id. Filter by passed `UUID_RECEIVER_RENDERER` - `globalUUIDList` map `UUID_RECEIVER_RENDERER` to webcontents id.

-------------------------

## Redux middleware for permission check

![alt text](./diagrams/permissionMiddleware.png?raw=true "Permission middleware")

Each dispatched action before it reaches target dapp go to main process and validate in `validatePermissionAction` middleware. Main process due to UUID identificators checks if action is passed by client or dapp and apply own validation rules for each group in a separate way.

-------------------------

## Dapp communication protocol

![alt text](./diagrams/DappCommunication.png?raw=true "Dapp communication")



### Actions roadmap

On dispatch action with propose answer dispatch openchannel(channelId). [UUID target store resolver](#UUID) is used to pass action to the right renderer process. Then we bind opened channels to provide `ipcCommunicator` communication abstraction.


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

![alt text](./diagrams/eventsMechanizm.png?raw=true "Events mechanizm")

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
- Render can init now opening channel for data passing, etc.

-------------------------

## Component-channel resolver

Resolve `CHANNEL_ID` for dapp renderer process to get data from **main process component** (ex. LocalStorage, BitShares, etc.):

![alt text](./diagrams/channelIdResolve.png?raw=true "Resolve channelId")

Each component will have a channel through which data will be sent. We use separate channels for security reasons. Before dapp process starts we check component access permissions in manifest file, create and pass channelIds to preload script. By this we add security layer on renderer side.

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
> https://www.i2b2.org/software/projects/datarepo/CRC_Architecture_10.pdf

# Array library documentation

```
array
|- dapp - |
|         |-- subscribe
|
|- ipcCommunicator
```

# array.dapp
The `array.dapp` object control your decentralized application event lifecycle.

Events
------
The `dapp` object emits the following events:

### Event: 'will-finish-launching'
Emitted when the application has finished basic startup.

### Event: 'active'
Emitted when the application has changed state to foreground. User works with your dapp.

### Event: 'non-active'
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


# array.ipcCommunicator
Communicate asynchronously from the your dapp process to another dapp.
The `ipcCommunicator` module is an instance of the `EventEmitter` class. It provides a few methods so you can:
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
  const { ipcCommunicator } = require('array');
  var senderDappComm = new ipcCommunicator('receiverDappName');
  
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
> [Electron app](https://electronjs.org/docs/api/app)

> [Electron source code](https://github.com/electron/electron/search?q=continue-activity&unscoped_q=continue-activity)

> web3 events api:
>> https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html?highlight=eventEmitter
>> https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=eventEmitter
>> https://github.com/ethereum/web3.js/blob/develop/lib/web3.js
