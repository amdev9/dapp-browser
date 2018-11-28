import { Subject } from 'rxjs';
import { ofType } from 'redux-observable';
import { AnyAction } from 'redux';
import { action } from 'typesafe-actions';
const ArrayIO = require('array-io');

interface CheckedSquare {
  x: number;
  y: number;
}

export type CheckedSquares = [CheckedSquare, CheckedSquare, CheckedSquare];

export type Square = string[];
export type HistoryTap = { squares: Square[] };

export function calculateWinner(squares: Square[]): CheckedSquares | null {
  const lines: CheckedSquares[] = [
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ],
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 }
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a.x][a.y] &&
      squares[a.x][a.y] === squares[b.x][b.y] &&
      squares[a.x][a.y] === squares[c.x][c.y]) {
      return lines[i];
    }
  }

  return null;
}

const ASK_INVITE = 'ASK_INVITE';
const ACCEPT_INVITE = 'ACCEPT_INVITE';
const SEND_ACTION = 'SEND_ACTION';

const askInvite = (): string => JSON.stringify(action(ASK_INVITE));
const acceptInvite = (symbol: string): string => JSON.stringify(action(ACCEPT_INVITE, { symbol }));
const sendAction = (x: number, y: number): string => JSON.stringify(action(SEND_ACTION, { x, y }));

export const symbolsMap = {
  x: 'x',
  o: 'o',
};

export function nextTurn(currentTurn: string): string {
  return (currentTurn === symbolsMap.x ? symbolsMap.o : symbolsMap.x);
}

export function checkFillAllSquares(squares: Square[]) {
  return squares.every((square) => square.every(s => !!s));
}

export interface InitGameInterface {
  leaveGame: () => void;
  sendStep: (x: number, y: number) => void;
  playerSymbol: string;
  currentPlayerStep: boolean;
}

const getRandomSymbol = (): string => {
  const anyItem: number = parseInt(Math.random().toFixed(0), 10);
  return [symbolsMap.x, symbolsMap.o][anyItem];
}

export async function findPlayer(onAction: (x: number, y: number) => void, onEnemyLeave?: () => void): Promise<InitGameInterface> {
  const chat: ArrayIO.IpfsRoom = new ArrayIO.IpfsRoom();
  const observable: Subject<AnyAction> = new Subject();
  let myPeerId: string = '', enemyId: string = '', currentPlayerStep: boolean = false, playerSymbol: string = '';

  const leaveGame = () => {
    subscriberSendAction.unsubscribe();
    chat.leave();
  };

  const sendStep = (x: number, y: number) => {
    chat.sendMessageTo(sendAction(x, y), enemyId);
  };

  observable.subscribe((action) => console.log('action:', action));

  const invitePromise = new Promise((resolve, reject) => {
    const subscriberInvite = observable
      .pipe(ofType(ASK_INVITE))
      .subscribe((action) => {
        if (!enemyId) {
          enemyId = action.meta.from;
          subscriberInvite.unsubscribe();
          console.log('OLD PLAYER');
          currentPlayerStep = true;
          playerSymbol = getRandomSymbol();
          const enemySymbol: string = nextTurn(playerSymbol);

          chat.sendMessageTo(acceptInvite(enemySymbol), action.meta.from);

          resolve();
        }
      });
  });

  const acceptPromise = new Promise((resolve, reject) => {
    const subscriberAccept = observable
      .pipe(ofType(ACCEPT_INVITE))
      .subscribe((action) => {
        if (!enemyId) {
          enemyId = action.meta.from;
          subscriberAccept.unsubscribe();
          console.log('NEW PLAYER');
          currentPlayerStep = false;
          playerSymbol = action.payload.symbol;

          resolve();
        }
      });
  });

  const subscriberSendAction = observable
    .pipe(ofType(SEND_ACTION))
    .subscribe(({ payload }) => onAction(payload.x, payload.y));

  await chat.subscribe('test-game-room', {
    onSubscribe: (peerId) => {
      myPeerId = peerId;
    },
    onJoined: (peerId: string) => {
      console.log('joined:', peerId);
      if (!enemyId) {
        chat.sendMessageTo(askInvite(), peerId);
      }
    },
    onMessage: (message: { from: string, data: Buffer | string }) => {
      const ownMsg = myPeerId === message.from;
      const peerMsg = message.data.toString();

      // If message from self or not enemy player
      if (ownMsg || enemyId && enemyId !== message.from) {
        return;
      }

      try {
        const msg = JSON.parse(peerMsg);
        const action = { ...msg, meta: { from: message.from } };
        observable.next(action);
      } catch (error) {
        console.log('message parse error', error);
      }
    },
    onLeft: (peerId: string) => {
      console.log('onLeft', peerId, enemyId);
      if (enemyId && enemyId === peerId) {
        onEnemyLeave && onEnemyLeave();
        leaveGame();
      }
    }
  });

  console.log('after subscribe');
  await Promise.race([acceptPromise, invitePromise]);

  return {
    leaveGame,
    sendStep,
    playerSymbol,
    currentPlayerStep,
  };
}
