import * as React from 'react';
import BlockTableRow from '../BlockTableRow';

const ArrayIO = require('array-io');

export type BlockObject = {
  block: any;
  transaction: any;
};

interface IProps {}
interface IState {
  blockList: BlockObject[];
  networkUnsubscriber: null | (() => void);
}

export default class BlocksTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      blockList: [],
      networkUnsubscriber: null,
    };
  }

  renderHead() {
    return (
      <thead>
      <tr>
        <th scope="col">BLOCK ID</th>
        <th scope="col">TRANSACTIONS COUNT</th>
        <th scope="col">WITNESS</th>
        <th scope="col">TIME</th>
      </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody id="tbody">
        {this.state.blockList.map((block: any, i: number) => <BlockTableRow key={i} block={block}/>)}
      </tbody>
    );
  }

  onClickSubscribe() {
    const networkUnsubscriber = ArrayIO.ArrayIO.networkSubscribe({
      onGetBlock: (block: any) => this.setState({ blockList: [...this.state.blockList, block] })
    });

    this.setState({ networkUnsubscriber });
  }

  onClickUnsubscribe() {
    this.state.networkUnsubscriber && this.state.networkUnsubscriber();
  }

  renderHeader() {
    return (
      <div>
        <h1>Block Explorer</h1>
        <div>
          <button onClick={this.onClickSubscribe.bind(this)}>Subscribe</button>
          <button onClick={this.onClickUnsubscribe.bind(this)}>Unsubscribe</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container pt-5">
        {this.renderHeader()}
        <table className="table table-hover">
          {this.renderHead()}
          {this.renderBody()}
        </table>
      </div>
    );
  }
}
