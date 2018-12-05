import * as React from 'react';

import BlocksTable from './BlocksTable';

export default class Root extends React.Component {
  render() {
    return (
      <div className="container pt-5">
        <BlocksTable/>
      </div>
    );
  }
}
