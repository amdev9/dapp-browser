import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../redux/actions/counter';
import * as NotificationActions from '../redux/actions/notification';
import * as LoaderActions from '../redux/actions/loader';
import * as TrayActions from '../redux/actions/tray';
import * as StatusBarActions from '../redux/actions/status-bar';
import * as AppsFeedActions  from "../redux/actions/appsFeed";
import { AppItem, NotifyItem, StatusBarItem, FeedItem } from '../redux/model';
import { HeaderBar } from './HeaderBar'
import { NotificationPanel } from "./NotificationPanel"
import { LoaderPanel } from './LoaderPanel'
import { StatusBar } from "./StatusBar"
import { Tray } from './Tray';
import { AppsFeed } from './AppsFeed';
import { IState } from '../redux/reducers/state';

interface AppProps {
  counter: number,
  openNotificationPanel: boolean,
  openLoaderPanel: boolean,
  openStatusBarPanel: boolean,
  trayItems: AppItem[],
  feedItems: FeedItem[],
  notifyItems: NotifyItem[],
  statusBarItems?: {[index: string]: StatusBarItem},
  statusBarToggle: () => void,
  onIncrement: () => any,
  onDecrement: () => any,
  onTogglePanel: (openStatus?: boolean) => any,
  onToggleHome: (openStatus?: boolean) => any,
  onToggleLoaderPanel: (openStatus?: boolean) => any,
  clearNotification: (id?: number) => void,
  clearAllNotifications: () => void,
  onAddAppItem: (appItem?: AppItem) => any,
  onSwitchDapp: (targetDappId?: number, targetDappName?: string) => any,
  onToggleAppHome: (dappName: string) => any,
  onResizeAppsFeed: (width: number, height: number) => any,
}

class App extends React.Component<AppProps> {
  render() {
    const {
      onTogglePanel, openNotificationPanel, openStatusBarPanel, clearNotification, clearAllNotifications,
      onAddAppItem, onSwitchDapp, onToggleHome, statusBarToggle, onToggleAppHome,
      trayItems, feedItems, notifyItems, statusBarItems, onToggleLoaderPanel, openLoaderPanel, onResizeAppsFeed
    } = this.props;


    return (
      <div>
        <HeaderBar
          isOpen={openNotificationPanel}
          togglePanel={() => onTogglePanel()}
          toggleLoaderPanel={onToggleLoaderPanel}
          toggleHome={() => onToggleHome(true)}
          key="root-headerbar" />
        <NotificationPanel
          clearAllNotifications={() => clearAllNotifications()}
          clearNotification={(id: number) => clearNotification(id)}
          items={notifyItems}
          isOpen={openNotificationPanel}
          togglePanel={(openStatus) => onTogglePanel(openStatus)}
          isLoaderPanelOpen={openLoaderPanel}
          toggleLoaderPanel={(openStatus) => onToggleLoaderPanel(openStatus)}
          key="root-notifications" />
        <LoaderPanel
          isOpen={openLoaderPanel}
          togglePanel={(openStatus) => onToggleLoaderPanel(openStatus)}
          isNotificationPanelOpen={openNotificationPanel}
          toggleNotificationPanel={(openStatus) => onTogglePanel(openStatus)}
          key="root-loader" />
        <div className="content-zone" key="root-content" id="root-container">
          {/* <div className="content" id="content-wrap"> */}
            {/* <main className="page-container"> */}
              <Tray items={trayItems} toggleSwitch={onSwitchDapp} toggleStatusBar={statusBarToggle} statusBarIsOpen={openStatusBarPanel}/>

              <AppsFeed items={feedItems} toggleAppHome={onToggleAppHome} resizeAppsFeed={onResizeAppsFeed}/>
              {/*  */}

            {/* </main> */}
          {/* </div> */}
        </div>
        <StatusBar isOpen={openStatusBarPanel} items={statusBarItems} toggleStatusBar={statusBarToggle} />
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  counter: state.counter,
  notifyItems: state.notification.items,
  openNotificationPanel: state.notification.isOpen,
  openLoaderPanel: state.loader.isOpen,
  openStatusBarPanel: state.statusBar.isOpen,
  statusBarItems: state.statusBar.items,
  trayItems: state.tray.items,
  feedItems: state.feed.items
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onIncrement: CounterActions.increment,
  onDecrement: CounterActions.decrement,
  onTogglePanel: NotificationActions.toggle,
  clearNotification: NotificationActions.clearNotification,
  clearAllNotifications: NotificationActions.clearAllNotifications,
  onToggleLoaderPanel: LoaderActions.toggle,
  statusBarToggle: StatusBarActions.toggle,
  onAddAppItem: TrayActions.addAppItem,
  onSwitchDapp: TrayActions.switchDapp,
  onToggleHome: TrayActions.toggleHome,
  onToggleAppHome: TrayActions.toggleAppHome,
  onResizeAppsFeed: AppsFeedActions.resize,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
