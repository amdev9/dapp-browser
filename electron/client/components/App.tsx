import * as React from 'react';
import { Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route path='/:page/:dapp' children={({ match, ...rest }) => {
          console.log('router', match, rest)
          return this.props.children
        }
        } />
      </div>
    );
  }
}
