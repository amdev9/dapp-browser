import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import * as TrayActions from '../redux/actions/tray';

import { AppItem } from '../redux/model';

import { connect } from 'react-redux';
import { HeaderBar } from "./HeaderBar"
import { NotificationPanel } from "./NotificationPanel"
import { Tray } from './Tray';
import { AppsFeed } from './AppsFeed';
import { IState } from '../redux/reducers/state';

interface AppProps {
  counter: number,
  openNotificationPanel: boolean,
  trayItems: AppItem[],
  onIncrement: () => any,
  onDecrement: () => any,
  onToggle: (openStatus?: boolean) => any,
  onAddAppItem: (appItem?: AppItem) => any,
  onSwitchDapp: (targetDappId?: number, targetDappName?: string) => any
}

class App extends React.Component<AppProps> {
  render() {

    const appItemTest: AppItem = {
      id: 1,
      appName: "index",
      icon: require("../assets/app-icons/share.svg"),
      statusIcon: ["running"]
    };
    const appItemTest2: AppItem = {
      id: 2,
      appName: "index2",
      icon: require("../assets/app-icons/chat.svg"),
      statusIcon: ["running"]
    };
     
    const { 
      onIncrement, onDecrement, counter, 
      onToggle, openNotificationPanel,
      onAddAppItem, onSwitchDapp, trayItems
    } = this.props;
    return (
      <div>
        <HeaderBar isOpen={openNotificationPanel} togglePanel={() => onToggle()} key="root-headerbar" />
     
        <NotificationPanel isOpen={openNotificationPanel} togglePanel={(openStatus) => onToggle(openStatus)} key="root-notifications" />

        {/* <p>{counter}</p>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button> */}
        
        {/* <button onClick={() => onSwitchDapp('Share')}>switch dapp</button> */}
        <button onClick={() => onAddAppItem(appItemTest)}>add tray icon 1</button>
        <button onClick={() => onAddAppItem(appItemTest2)}>add tray icon 2</button> 

        <div className="content-zone" key="root-content" id="root-container">
          
           
          {/* <div className="content" id="content-wrap"> */}
            
            {/* <main className="page-container"> */}
              <Tray items={trayItems} toggleSwitch={onSwitchDapp}/>
              <AppsFeed />
             
            {/* </main> */}
          {/* </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  counter: state.counter,
  openNotificationPanel: state.notification.isOpen,
  trayItems: state.tray.items
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onIncrement: CounterActions.increment,
  onDecrement: CounterActions.decrement,
  onToggle: NotificationActions.toggle,
  onAddAppItem: TrayActions.addAppItem,
  onSwitchDapp: TrayActions.switchDapp
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);