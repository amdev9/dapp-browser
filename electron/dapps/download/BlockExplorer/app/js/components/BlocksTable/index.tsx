import * as React from 'react';
import BlockTableRow from '../BlockTableRow';

const ArrayIO = require('array-io');
const styles: any = require('./styles.sass');

export default class BlocksTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockList: [],
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
        {this.state.blockList.map((block, i) => <BlockTableRow key={i} block={block}/>}
      </tbody>
    );
  }

  onClickSubscribe() {
    const unsubscriber = ArrayIO.ArrayIO.networkSubscribe({
      onGetBlock: (block) => this.setState({ blockList: [...this.state.blockList, block] })
    });

    this.setState({ unsubscriber });
  }

  onClickUnsubscribe() {
    this.state.unsubscriber && this.state.unsubscriber();
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
    console.log('table', this.state.blockList)

    return (
      <div className="container pt-5">
        {this.renderHeader()}
        <table className="table table-hover">
          {this.renderBody()}
        </table>
      </div>
    );
  }
}
