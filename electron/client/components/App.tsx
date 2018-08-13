import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import { connect } from 'react-redux';
import { HeaderBar } from "./HeaderBar"
import { NotificationPanel } from "./NotificationPanel"
import { Tray } from './Tray';
 

import { IState } from '../redux/reducers';

interface AppProps {
  counter: number,
  notification: boolean,
  increment(): void,
  decrement(): void,
  toggle( openStatus?: boolean): void
}

class App extends React.Component<AppProps> {
  render() {
    const { 
      increment, decrement, counter, 
      toggle, notification 
    } = this.props;
    return (
      <div>
        <HeaderBar isOpen={notification} togglePanel={() => toggle()} key="root-headerbar" />
        <NotificationPanel isOpen={notification} togglePanel={(openStatus) => toggle(openStatus)} key="root-notifications" />

        {/* <p>{counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button> */}
 
        <div key="root-content" id="root-container" className="content-zone">
          <Tray />
           
          <div className="content" id="content-wrap">
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
    counter: state.counter,
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<AppProps> {
  return bindActionCreators(Object.assign({}, NotificationActions, CounterActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);