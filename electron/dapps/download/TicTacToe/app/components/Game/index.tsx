import * as React from 'react';

import * as cn from 'classnames';
import Board from '../Board';
import { calculateWinner, cloneNestedArray } from '../../redux/utils';
import { IpfsRoom } from "../../../types/array-io";
import emitter from './event';

import uuid = require("uuid/v4");

const ArrayIO = require('array-io');
const styles: any = require('./styles.scss');

const symbolsMap = {
  x: 'x',
  o: 'o',
};

export const nextTurn = (currentTurn) => {
  return (currentTurn === symbolsMap.x ? symbolsMap.o : symbolsMap.x);
};

// emitter.on('/', (peerId: string, msg: string) => {
//   console.log(`${peerId}:${msg}`);
// });

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      }],
      highLights: [],

      enemyUUID: null,

      playerSymbol: null,

      currentPlayerStep: false,

      msgList: [],
      uuid: uuid(),
    };
  }

  appendMsg(message: { from: string, data: Buffer | string }) {
    const msg = `${message.from}:${message.data.toString()}`;

    this.setState({ msgList: [...this.state.msgList, msg] });
  }

  getFirstId(uuid: string) {
    if (uuid) {
      return uuid.split('-')[0];
    }

    return;
  }

  async subscribeToIpfsRoom() {
    const chat: IpfsRoom = new ArrayIO.IpfsRoom();

    const askInvite = 'ASK_INVITE';
    const acceptInvite = 'ACCEPT_INVITE';
    let myPeerId: string;
    let acceptedPeerId: string;

    chat.subscribe('test-game-room', {
      onSubscribe: async (peerId: string) => {
        myPeerId = peerId;
        console.log('subscribed', peerId);
        chat.sendMessageBroadcast(askInvite);
        const peers = await chat.getPeers()
        console.log('peerssasa', peers)
      },
      onMessage: (message: { from: string, data: Buffer | string }) => {
        const ownMsg = myPeerId === message.from;
        const peerMsg = message.data.toString();
        console.log('msg', peerMsg, ownMsg, 'myid', myPeerId, 'sender peerid', message.from);

        if (!ownMsg) {
          console.log('NOT SELF MESSAGE', peerMsg, message.from);
          if (peerMsg === askInvite) {
            chat.sendMessageTo(acceptInvite, message.from);
          }

          if (peerMsg === acceptInvite) {
            chat.sendMessageTo(acceptInvite, message.from);
          }
        }
      }
    });
  }

  subscribeToEventEmitter() {
    const { uuid } = this.state;

    const comeIn = 'comeIn';
    const askInvite = 'go game';
    const acceptInvite = 'go game: ok!';
    const setInitialData = 'setInitialData';
    let accepted = false;
    let isInitialPeer = false;

    const setInitialPeer = () => {
      isInitialPeer = true;
    };

    const listenerComeIn = (peerId: string) => {
      const ownMsg = peerId === uuid;

      if (!ownMsg) {
        setInitialPeer();
        console.log('comeIn', this.getFirstId(peerId), 'myid', this.getFirstId(uuid));
        emitter.emit(peerId, uuid, askInvite);
      }
    };

    const selfEvent = (peerId: string, msg: string) => {
      const ownMsg = peerId === uuid;
      console.log('selfEvent', msg, this.getFirstId(peerId), 'myid', this.getFirstId(uuid));

      if (!ownMsg && !accepted) {
        if (msg === askInvite) {
          emitter.emit(peerId, uuid, acceptInvite);
          console.log('askInvite', this.getFirstId(peerId), 'myid', this.getFirstId(uuid));
        }

        if (msg === acceptInvite) {
          accepted = true;
          // unsubComeIn();
          this.setState({ currentPlayerStep: isInitialPeer });
          console.log('acceptInvite', this.getFirstId(peerId), 'myid', this.getFirstId(uuid));
          this.receiveActionsFromPlayer(peerId);
          emitter.emit(peerId, uuid, acceptInvite);

          if (isInitialPeer) {
            emitter.emit(peerId, uuid, setInitialData);
            this.setState({ playerSymbol: symbolsMap.x });
            unsubComeIn();
            unsubSelfEvent();
          }
        }
      }

      if (!ownMsg) {
        if (msg === setInitialData) {
          accepted = true;

          this.setState({ playerSymbol: symbolsMap.o });
          unsubComeIn();
          unsubSelfEvent();
        }
      }
    };

    const unsubComeIn = () => emitter.removeListener(comeIn, listenerComeIn);
    const unsubSelfEvent = () => emitter.removeListener(uuid, selfEvent);

    emitter.on(comeIn, listenerComeIn.bind(this));
    emitter.on(uuid, selfEvent.bind(this));

    emitter.emit(comeIn, uuid);

  }

  componentDidMount() {
    // this.subscribeToEventEmitter();
    this.subscribeToIpfsRoom()
    // const chat: IpfsRoom = new ArrayIO.IpfsRoom();
    //
    // const askInvite = 'go game';
    // const acceptInvite = 'go game: ok!';
    // let myPeerId: string;
    // let acceptedPeerId: string;
    //
    // chat.subscribe('test-game-room', {
    //   onSubscribe: (peerId: string) => {
    //     myPeerId = peerId;
    //     console.log('subscribed', peerId);
    //     chat.sendMessageBroadcast(askInvite);
    //   },
    //   onMessage: (message: { from: string, data: Buffer | string }) => {
    //     const ownMsg = myPeerId === message.from;
    //     const peerMsg = message.data.toString();
    //     console.log('msg', peerMsg, ownMsg, 'myid', myPeerId, 'sender peerid', message.from);
    //
    //     if (!ownMsg) {
    //       console.log('NOT SELF MESSAGE', peerMsg, message.from);
    //       if (peerMsg === askInvite) {
    //         chat.sendMessageTo(acceptInvite, message.from);
    //       }
    //
    //       if (peerMsg === acceptInvite) {
    //         chat.sendMessageTo(acceptInvite, message.from);
    //       }
    //     }
    //   }
    // });

  }

  async handleClick(x, y, me: boolean = true) {
    const history = this.state.history.slice(0);
    const current = history[history.length - 1];
    const squares = cloneNestedArray(current.squares.slice());
    const highLights = this.state.highLights;

    if (highLights.length > 0 || squares[x][y]) {
      return;
    }

    squares[x][y] = me ? this.state.playerSymbol : nextTurn(this.state.playerSymbol);

    const winner = calculateWinner(squares);
    console.log('handleClick winner', winner)

    if (me) {
      console.log('if me', me);
      await this.sendActionToPlayer(x, y);
      this.setState({ currentPlayerStep: false });
    } else {
      this.setState({ currentPlayerStep: true });
    }

    this.setState({
      history: history.concat([{
        squares,
      }]),
      winner: winner || null,
      stepNumber: history.length,
    });
  }

  receiveActionsFromPlayer(uuid: string) {
    this.setState({ enemyUUID: uuid });

    emitter.on(`${this.state.uuid}/game`, ({ x, y }) => {
      console.log('game event', x, y);
      this.handleClick(x, y, false);
    });
  }

  sendActionToPlayer(x, y) {
    const { enemyUUID, uuid } = this.state;

    emitter.emit(`${enemyUUID}/game`, { x, y });
  }

  render() {
    const { highLights, history, winner, stepNumber, msgList, currentPlayerStep, playerSymbol } = this.state;
    const current = history[history.length-1];

    let status;
    if (winner) {
      // const { x, y } = highLights[0];
      const winnerFirstSymbol = winner[0];

      const winnerSymbol = current.squares[winnerFirstSymbol.x][winnerFirstSymbol.y]
      console.log('winner', winnerSymbol, current.squares, 'mysymbol', playerSymbol)

      status = `Winner: ${winnerSymbol}`;
    } else {
      status = `Next Player: ${currentPlayerStep ? 'me' : 'enemy'}\r\n My symbol:${playerSymbol}`;
    }

    console.log('render', currentPlayerStep, this.state);

    return (
      <div className={cn('game', { [styles.game_inactive]: !currentPlayerStep || winner })}>
        <div className="game-board">
          <Board
            highLights={highLights}
            squares={current.squares}
            onClick={(x, y) => currentPlayerStep && !winner && this.handleClick(x, y)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{msgList.map((msg) => <div>{msg}</div>)}</div>
        </div>
      </div>
    );
  }
}

export default Game;
