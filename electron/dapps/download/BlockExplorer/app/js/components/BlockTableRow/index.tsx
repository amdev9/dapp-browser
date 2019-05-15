import * as React from 'react';

const DappIO = require('dapp-io');

interface IProps {
  block: any;
}

interface IState {
  isExpanded: boolean;
}

export default class BlockTableRow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  renderRow() {
    const blockObject = this.props.block.block;

    return (
      <tr key={0} onClick={() => this.setState({ isExpanded: !this.state.isExpanded })}>
        <td>{blockObject.blockID}</td>
        <td>{blockObject.transactionsCount}</td>
        <td>{blockObject.witnessName}</td>
        <td>{new Date(blockObject.timestamp).toLocaleString('en-US', {})}</td>
      </tr>
    );
  }

  renderAdditionalRow() {
    const { block } = this.props;

    return (
      <tr key={1}>
        <td colSpan={4}>{JSON.stringify(block)}</td>
      </tr>
    );
  }

  render() {

    return [this.renderRow(), this.state.isExpanded ? this.renderAdditionalRow() : null];
  }
}
