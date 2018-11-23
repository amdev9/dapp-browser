import * as React from 'react';
import * as cn from 'classnames';

const styles: any = require('./styles.scss');

class Row extends React.Component {
  isHightLight(row: number, col: number) {
    const { highLights } = this.props;

    return highLights && highLights.find(highLight => {
      return highLight.x === row && highLight.y === col;
    });
  }

  render() {
    const { row, rowIdx, highLights, onClick } = this.props;
    return (
      <div className={styles.boardRow}>
        {row.map((col, colIdx) => (
          <button
            key={colIdx}
            className={cn(styles.boardRowSquare, { boardRowSquare_Yellow: this.isHightLight(rowIdx, colIdx) })}
            onClick={() => onClick(rowIdx, colIdx)}>
            {row[colIdx]}
          </button>
        ))}
      </div>
    );
  }
}

export default Row;
