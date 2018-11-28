import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import * as cn from 'classnames';
import * as uuid from 'uuid/v4';

import Board from '../Board';
import {
  calculateWinner,
  checkFillAllSquares,
  createGame,
  nextTurn,
  InitGameInterface,
  CheckedSquares,
  HistoryTap,
  Square,
} from '../../redux/utils';
import * as constants from '../../redux/constants';

const styles: any = require('./styles.scss');

interface StateProps {
}

interface IState {
  history: HistoryTap[];
  playerSymbol: string;
  currentPlayerStep: boolean;
  enemyLeaved: boolean;
  game: InitGameInterface | null;
  gameFetching: boolean;
  gameError: string | null;
  winner: CheckedSquares | null;
  operationUID: string | null;
}

class Game extends React.Component<InjectedFormProps, IState> {
  constructor(props: InjectedFormProps) {
    super(props);
    this.state = {
      ...this.nullState,
    };
  }

  get nullState() {
    return {
      operationUID: null,
      enemyLeaved: false,
      playerSymbol: '',
      winner: null,
      gameError: null,
      gameFetching: false,
      game: null,
      currentPlayerStep: false,
      history: [{
        squares: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }]
    };
  }

  async handleClick(x: number, y: number, me: boolean = true) {
    const { history } = this.state;
    const current = history[history.length - 1];
    const squares: Square[] = current.squares.slice();
    const isSetPoint = squares[x][y];

    if (isSetPoint) {
      return;
    }

    squares[x][y] = me ? this.state.playerSymbol : nextTurn(this.state.playerSymbol);

    const winner = calculateWinner(squares);

    if (me) {
      this.state.game && await this.state.game.sendStep(x, y);
      this.setState({ currentPlayerStep: false });
    } else {
      this.setState({ currentPlayerStep: true });
    }

    this.setState({
      history: this.state.history.concat([{
        squares,
      }]),
      winner: winner || null,
    });
  }

  getStatus() {
    const { history, winner, currentPlayerStep, playerSymbol, enemyLeaved } = this.state;
    const current = history[history.length - 1];

    if (enemyLeaved) {
      return <div>Enemy has been leaved</div>;
    }

    if (winner) {
      const winnerFirstSymbol = winner[0];

      const winnerSymbol = current.squares[winnerFirstSymbol.x][winnerFirstSymbol.y];

      return <div>Winner: {winnerSymbol}</div>;
    }

    if (checkFillAllSquares(current.squares)) {
      return <div>Nobody wins</div>;
    }

    return (
      <div>
        Next Player: {currentPlayerStep ? 'me' : 'enemy'}
        <div>My symbol:{playerSymbol}</div>
      </div>
    );
  }

  renderGame() {
    const { history, winner, currentPlayerStep } = this.state;
    const current = history[history.length - 1];

    console.log('render', currentPlayerStep, this.state);

    return (
      <div className={cn('game', { [styles.game_inactive]: !currentPlayerStep || winner })}>
        <div className="game-board">
          <Board
            highLights={winner}
            squares={current.squares}
            onClick={(x: number, y: number) => currentPlayerStep && !winner && this.handleClick(x, y)}/>
        </div>
        <div className="game-info">
          <div>{this.getStatus()}</div>
          <button onClick={this.leaveGame.bind(this)}>leave room</button>
        </div>
      </div>
    );
  }

  async findGame(gameRoom?: string) {
    const operationUID = uuid();
    this.setState({ operationUID, gameFetching: true });
    try {
      const game = await createGame({
        gameRoom,
        onAction: (x, y) => this.handleClick(x, y, false),
        onEnemyLeave: () => this.setState({ enemyLeaved: true }),
      });

      console.log('game', game);
      if (operationUID === this.state.operationUID) {
        this.setState({
          game,
          gameFetching: false,
          playerSymbol: game.playerSymbol,
          currentPlayerStep: game.currentPlayerStep,
        });
      } else {
        game.leaveGame();
      }
    } catch (error) {
      this.setState({
        gameError: 'Error connecting',
        gameFetching: false,
      });
    }
  }

  leaveGame() {
    this.state.game && this.state.game.leaveGame();

    this.resetState();
  }

  handleSubmit(values: any) {
    const roomName = values.roomName;

    this.findGame(roomName);
  }

  renderFindGameScreen() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
          <div>Connect to the room</div>
          <Field
            name="roomName"
            type="text"
            component="input"
            placeholder="Enter room name..."
          />
          <button>Connect</button>
        </form>
        or
        {this.findGameButton()}
      </div>
    );
  }

  findGameButton() {
    return <button onClick={() => this.findGame()}>Find game</button>;
  }

  renderError() {
    return (
      <div>
        Connection error
        {this.findGameButton()}
      </div>
    );
  }

  resetState() {
    this.setState({ ...this.nullState });
  }

  renderFetching() {
    return (
      <div>
        Waiting enemy player...
        <button onClick={this.resetState.bind(this)}>Back</button>
      </div>
    );
  }

  renderScreen() {
    const { game, gameFetching, gameError } = this.state;

    if (gameError) {
      return this.renderError();
    }

    if (gameFetching) {
      return this.renderFetching();
    }

    if (game) {
      return this.renderGame();
    }

    return this.renderFindGameScreen();
  }

  render() {
    console.log('render', this.state);

    return (
      <div className="game">
        {this.renderScreen()}
      </div>
    );
  }
}

export default reduxForm<{}, StateProps>({ form: constants.FORM_GAME_ROOM_CONNECT })(Game);
