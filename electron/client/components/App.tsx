import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CounterActions from '../actions/counter';
import { connect } from 'react-redux';

 
import { IState } from '../reducers';

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
        <h1>Client BrowserWindow</h1>
        <p>{counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementIfOdd}>incrementIfOdd</button>
        <button onClick={() => incrementAsync()}>incrementAsync</button>
      </div>
    );
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