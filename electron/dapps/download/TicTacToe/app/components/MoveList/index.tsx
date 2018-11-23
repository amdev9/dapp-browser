import * as React from 'react';

function Move(props) {
  const { x, y } = props.step.checked;
  const { jumpTo, index } = props;
  const order = x && y ?
    `Move (${x}, ${y})` :
    'Game start';

  return (
    <li>
      <div onClick={() => jumpTo(index)}>{order}</div>
    </li>
  );
}

class MoveList extends React.Component {
  render() {
    const { history, jumpTo } = this.props;
    return (
      <ol>
        {history.map((step, index) => (
          <Move
            key={index}
            step={step}
            index={index}
            jumpTo={jumpTo} />
        ))}
      </ol>
    );
  }
}

export default MoveList;
