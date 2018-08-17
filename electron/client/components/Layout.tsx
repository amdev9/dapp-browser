import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import * as TrayActions from '../redux/actions/tray';
import { AppItem, NotifyItem } from '../redux/model';
import { HeaderBar } from './HeaderBar'
import { NotificationPanel } from "./NotificationPanel"
import { Tray } from './Tray';
import { AppsFeed } from './AppsFeed';
import { IState } from '../redux/reducers/state';

interface AppProps {
  counter: number,
  openNotificationPanel: boolean,
  trayItems: AppItem[],
  notifyItems: NotifyItem[],
  onIncrement: () => any,
  onDecrement: () => any,
  onToggle: (openStatus?: boolean) => any,
  clearNotification: (id?: number) => void,
  clearAllNotifications: () => void,
  onAddAppItem: (appItem?: AppItem) => any,
  onSwitchDapp: (targetDappId?: number, targetDappName?: string) => any
}

class App extends React.Component<AppProps> {
  render() {
    const { 
      onToggle, openNotificationPanel, clearNotification, clearAllNotifications,
      onAddAppItem, onSwitchDapp, trayItems, notifyItems
    } = this.props;
    return (
      <div>
        <HeaderBar isOpen={openNotificationPanel} togglePanel={() => onToggle()} key="root-headerbar" /> 
        <NotificationPanel 
          clearAllNotifications={() => clearAllNotifications()}   
          clearNotification={(id: number) => clearNotification(id)} 
          items={notifyItems} 
          isOpen={openNotificationPanel} 
          togglePanel={(openStatus) => onToggle(openStatus)} 
          key="root-notifications" />
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
  notifyItems: state.notification.items,
  openNotificationPanel: state.notification.isOpen,
  trayItems: state.tray.items,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onIncrement: CounterActions.increment,
  onDecrement: CounterActions.decrement,
  onToggle: NotificationActions.toggle,
  clearNotification: NotificationActions.clearNotification,
  clearAllNotifications: NotificationActions.clearAllNotifications,
  onAddAppItem: TrayActions.addAppItem,
  onSwitchDapp: TrayActions.switchDapp,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);