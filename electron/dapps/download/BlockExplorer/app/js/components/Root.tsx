import * as React from 'react';

import BlocksTable from './BlocksTable';
import BlocksHeader from './BlocksHeader';

export default class Root extends React.Component {
  render() {
    return (
      <div className="container pt-5">
        <BlocksHeader/>
        <BlocksTable/>
      </div>
    );
  }
}
