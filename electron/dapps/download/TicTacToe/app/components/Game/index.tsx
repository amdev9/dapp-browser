import * as React from 'react';

import Board from '../Board';
import MoveList from '../MoveList';
import { calculateWinner, cloneNestedArray } from '../../redux/utils';

const styles: any = require('./styles.scss');

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
        checked: {
          x: 0,
          y: 0
        }
      }],
      highLights: [],
      stepNumber: 0,
      xIsNext: true,

      player: 'X',
      currentPlayerStep: true,
    };
  }

  async handleClick(x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = cloneNestedArray(current.squares.slice());
    const highLights = this.state.highLights;

    if (highLights.length > 0 || squares[x][y]) {
      return;
    }

    squares[x][y] = this.state.xIsNext ? 'X' : 'O';
    const checked = { x: x + 1, y: y + 1 };

    const winner = calculateWinner(squares);
    const approve = await this.sendActionToPlayer(x, y);

    if (winner) {
      this.setState({ winner });
    }

    this.setState({
      history: history.concat([{
        squares,
        checked,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  sendActionToPlayer(x, y) {

  }

  render() {
    const { highLights, history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];

    let status;
    if (highLights.length > 0) {
      const { x, y } = highLights[0];
      let winnerSymbol = current.squares[x][y];

      if (!winnerSymbol) {
        winnerSymbol = history[stepNumber - 1].squares[x][y];
      }

      status = `Winner: ${winnerSymbol}`;
    } else {
      status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }

    console.log('render', current, this.state);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            highLights={highLights}
            squares={current.squares}
            onClick={(x, y) => this.handleClick(x, y)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <MoveList
            history={history}
            jumpTo={() => {
            }}/>
        </div>
      </div>
    );
  }
}

export default Game;
