import * as React from 'react';

import * as cn from 'classnames';
import Board from '../Board';
import {
  calculateWinner,
  checkFillAllSquares,
  symbolsMap,
  findPlayer,
  nextTurn,
  InitGameInterface,
  CheckedSquares,
  HistoryTap,
  Square,
} from '../../redux/utils';
import uuid = require("uuid");

const styles: any = require('./styles.scss');

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

interface IProps {
}

class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
    console.log('state', this.state);
    const { history } = this.state;
    const current = history[history.length - 1];
    const squares: Square[] = current.squares.slice();
    const isSetPoint = squares[x][y];

    if (isSetPoint) {
      return;
    }

    squares[x][y] = me ? this.state.playerSymbol : nextTurn(this.state.playerSymbol);

    const winner = calculateWinner(squares);
    console.log('handleClick winner', winner);

    if (me) {
      console.log('if me', me);
      this.state.game && await this.state.game.sendStep(x, y);
      console.log('after sendstep');
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

    if (checkFillAllSquares(current.squares)) {
      return <div>Nobody wins</div>;
    }

    if (winner) {
      const winnerFirstSymbol = winner[0];

      const winnerSymbol = current.squares[winnerFirstSymbol.x][winnerFirstSymbol.y];

      return <div>Winner: {winnerSymbol}</div>;
    }

    return (
      <div>
        Next Player: {currentPlayerStep ? 'me' : 'enemy'}
        <div>My symbol:{playerSymbol}</div>
      </div>
    );
  }

  renderGame() {
    const { history, winner, currentPlayerStep, playerSymbol, game } = this.state;
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

  async findGame() {
    const operationUID = uuid();
    this.setState({ operationUID, gameFetching: true });
    try {
      const game = await findPlayer(
        (x, y) => this.handleClick(x, y, false),
        () => this.setState({ enemyLeaved: true }),
      );

      console.log('game', game);
      if (operationUID === this.state.operationUID) {
        this.setState({
          game,
          gameFetching: false,
          playerSymbol: game.playerSymbol,
          currentPlayerStep: game.currentPlayerStep,
        });
      } else {
        game.leaveGame()
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

  renderFindGameScreen() {
    return (
      <div>
        {this.findGameButton()}
      </div>
    );
  }

  findGameButton() {
    return <button onClick={this.findGame.bind(this)}>Find game</button>;
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
        Connecting...
        <button onClick={this.resetState.bind(this)}>Reset connection</button>
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

export default Game;
