import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import { connect } from 'react-redux';
import { HeaderBar } from "./HeaderBar"
import { NotificationPanel } from "./NotificationPanel"
import { Tray } from './Tray';
 
import { IState } from '../redux/reducers/state';

interface AppProps {
  counter: number,
  notification: boolean,
  onIncrement: () => any,
  onDecrement: () => any,
  onToggle: (openStatus?: boolean) => any
}

class App extends React.Component<AppProps> {
  render() {
    const { 
      onIncrement, onDecrement, counter, 
      onToggle, notification 
    } = this.props;
    return (
      <div>
        <HeaderBar isOpen={notification} togglePanel={() => onToggle()} key="root-headerbar" />
        <NotificationPanel isOpen={notification} togglePanel={(openStatus) => onToggle(openStatus)} key="root-notifications" />

        <p>{counter}</p>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
 
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

const mapStateToProps = (state: IState) => ({
  counter: state.counter,
  notification: state.notification.isOpen
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onIncrement: CounterActions.increment,
  onDecrement: CounterActions.decrement,
  onToggle: NotificationActions.toggle
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);