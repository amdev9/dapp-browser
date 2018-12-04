import * as React from 'react';

const styles: any = require('./styles.sass');

export default class BlocksTable extends React.Component {
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
        {/*{this.renderBodyRow()}*/}
      </tbody>
    );
  }

  // renderBodyRow() {
  //   return (
  //
  //   );
  // }

  render() {
    return (
      <table className="table table-hover">
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}
