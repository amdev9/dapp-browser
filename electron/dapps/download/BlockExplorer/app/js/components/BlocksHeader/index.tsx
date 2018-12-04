import * as React from 'react';

const ArrayIO = require('array-io');
const styles: any = require('./styles.sass');

export default class BlocksTable extends React.Component {
  onClickSubscribe() {
    ArrayIO.ArrayIO.networkSubscribe();
  }

  onClickUnsubscribe() {
    ArrayIO.ArrayIO.networkUnsubscribe();
  }

  render() {
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
}
