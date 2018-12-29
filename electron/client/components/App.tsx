import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from '../components/Layout';

interface IAppType {
  isProduction: boolean;
}

export default class App extends React.Component<IAppType> {
  render() {
    const { isProduction } = this.props
    return (
      <div>
        <Route path="/:page/:dapp" children={({ match, ...rest }) => {
          return <Layout isProduction={isProduction} locationPath={rest.location.pathname} />
        }
        } />
      </div>
    );
  }
}
