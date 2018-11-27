import * as React from 'react';
import Row from '../Row';
import { CheckedSquares, Square } from '../../redux/utils';

interface IProps {
  squares: Square[];
  highLights: CheckedSquares | null;
  onClick: any;
}

class Board extends React.Component<IProps> {
  render() {
    const { squares, highLights, onClick } = this.props;
    return (
      <div>
        {squares.map((row: Square, i: number) => (
          <Row
            key={i}
            highLights={highLights}
            row={row}
            rowIdx={i}
            onClick={onClick}/>
        ))}
      </div>
    );
  }
}

export default Board;
