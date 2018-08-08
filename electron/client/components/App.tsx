import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CounterActions from '../redux/actions/counter';
import { connect } from 'react-redux';
import { HeaderBar } from "./HeaderBar"
 
 

import { IState } from '../redux/reducers';

interface AppProps {
  counter: number,
  increment(): void,
  decrement(): void,
  incrementIfOdd(): void,
  incrementAsync(): void
}

class App extends React.Component<AppProps> {
  render() {
    const { increment, decrement, incrementIfOdd, incrementAsync,  counter } = this.props;
    return (
      <div>
        <HeaderBar key="root-headerbar" />
        <div key="root-content" id="root-container" className="content-zone">
 
          <div className="content" id="content-wrap">
            <h3>Client BrowserWindow</h3>
            <p>{counter}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={incrementIfOdd}>incrementIfOdd</button>
            <button onClick={() => incrementAsync()}>incrementAsync</button>
            <main className="page-container">
            </main>
          </div>
        </div>
      </div>
    )
  }
}



function mapStateToProps(state: IState): Partial<AppProps> {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<AppProps> {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);