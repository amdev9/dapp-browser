import * as React from 'react';

const ArrayIO = require('array-io');

export default class BlockTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  renderRow() {
    const blockObject = this.props.block.block

    return (
      <tr key={0} onClick={() => this.setState({ isExpanded: !this.state.isExpanded })}>
        <td>{blockObject.blockID}</td>
        <td>{blockObject.transactionsCount}</td>
        <td>{blockObject.witnessName}</td>
        <td>{new Date(blockObject.timestamp).toLocaleString('en-US', {})}</td>
      </tr>
    )
  }

  renderAdditionalRow() {
    const { block } = this.props;

    return (
      <tr key={1}>
        <td colSpan='4'>{JSON.stringify(block)}</td>
      </tr>
    )
  }

  render() {

    return [this.renderRow(), this.state.isExpanded ? this.renderAdditionalRow(): null]
  }
}
