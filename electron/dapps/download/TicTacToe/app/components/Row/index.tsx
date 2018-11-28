import * as React from 'react';
import * as cn from 'classnames';

import { CheckedSquares, Square } from '../../redux/utils';

const styles: any = require('./styles.scss');

interface IProps {
  highLights: CheckedSquares | null;
  row: Square;
  rowIdx: number;
  onClick: (rowIdx: any, colIds: any) => void;
}

class Row extends React.Component<IProps> {
  isHightLight(row: number, col: number) {
    const { highLights } = this.props;

    return highLights && highLights.find((highLight) => {
      return highLight.x === row && highLight.y === col;
    });
  }

  render() {
    const { row, rowIdx, onClick } = this.props;
    return (
      <div className={styles.boardRow}>
        {row.map((col, colIdx: number) => (
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
