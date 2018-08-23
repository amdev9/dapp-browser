import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import * as TrayActions from '../redux/actions/tray';
import * as StatusBarActions from '../redux/actions/status-bar';
import { AppItem, NotifyItem, StatusBarItem } from '../redux/model';
import { HeaderBar } from './HeaderBar'
import { NotificationPanel } from "./NotificationPanel"
import { StatusBar } from "./StatusBar"
import { Tray } from './Tray';
import { AppsFeed } from './AppsFeed';
import { IState } from '../redux/reducers/state';

interface AppProps {
  counter: number,
  openNotificationPanel: boolean,
  openStatusBarPanel: boolean,
  trayItems: AppItem[],
  notifyItems: NotifyItem[],
  statusBarItems?: {[index: string]: StatusBarItem},
  statusBarToggle: () => void,
  onIncrement: () => any,
  onDecrement: () => any,
  onTogglePanel: (openStatus?: boolean) => any,
  onToggleHome: (openStatus?: boolean) => any,
  clearNotification: (id?: number) => void,
  clearAllNotifications: () => void,
  onAddAppItem: (appItem?: AppItem) => any,
  onSwitchDapp: (targetDappId?: number, targetDappName?: string) => any,
  onToggleAppHome: (dappName: string) => any,
}

class App extends React.Component<AppProps> {
  render() {
    const {
      onTogglePanel, openNotificationPanel, openStatusBarPanel, clearNotification, clearAllNotifications,
      onAddAppItem, onSwitchDapp, onToggleHome,
      trayItems, notifyItems, statusBarItems, statusBarToggle,
      onToggleAppHome
    } = this.props;

    const feedItems = [{
      preview: require("../assets/app-images/thumb.png"),
      icon: require("../assets/app-icons/exchange.svg"),
      categories: ["games", "tools"],
      name: "My Awesome Dapp 1",
    },  {
      preview: require("../assets/app-images/thumb.png"),
      icon: require("../assets/app-icons/exchange.svg"),
      categories: ["games", "tools"],
      name: "My Awesome Dapp 2",
    }];

    return (
      <div>
        <HeaderBar
          isOpen={openNotificationPanel}
          togglePanel={() => onTogglePanel()}
          toggleHome={() => onToggleHome(true)}
          key="root-headerbar" />
        <NotificationPanel 
          clearAllNotifications={() => clearAllNotifications()}   
          clearNotification={(id: number) => clearNotification(id)} 
          items={notifyItems} 
          isOpen={openNotificationPanel} 
          togglePanel={(openStatus) => onTogglePanel(openStatus)}
          key="root-notifications" />
        <div className="content-zone" key="root-content" id="root-container">
          {/* <div className="content" id="content-wrap"> */}  
            {/* <main className="page-container"> */}
              <Tray items={trayItems} toggleSwitch={onSwitchDapp} toggleStatusBar={statusBarToggle} statusBarIsOpen={openStatusBarPanel}/>
              
              <AppsFeed items={feedItems} toggleAppHome={onToggleAppHome}/> 
              {/*  */}

            {/* </main> */}
          {/* </div> */}
        </div>
        <StatusBar isOpen={openStatusBarPanel} items={statusBarItems} />
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  counter: state.counter,
  notifyItems: state.notification.items,
  openNotificationPanel: state.notification.isOpen,
  openStatusBarPanel: state.statusBar.isOpen,
  statusBarItems: state.statusBar.items,
  trayItems: state.tray.items,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onIncrement: CounterActions.increment,
  onDecrement: CounterActions.decrement,
  onTogglePanel: NotificationActions.toggle,
  clearNotification: NotificationActions.clearNotification,
  clearAllNotifications: NotificationActions.clearAllNotifications,
  statusBarToggle: StatusBarActions.toggle,
  onAddAppItem: TrayActions.addAppItem,
  onSwitchDapp: TrayActions.switchDapp,
  onToggleHome: TrayActions.toggleHome,
  onToggleAppHome: TrayActions.toggleAppHome
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);