import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as NotificationActions from '../redux/actions/notification';
import * as KeychainActions from '../redux/actions/keychain';
import * as LoaderActions from '../redux/actions/loader';
import * as TrayActions from '../redux/actions/tray';
import * as StatusBarActions from '../redux/actions/status-bar';
import * as SearchActions from '../redux/actions/search';
import * as SettingsActions from '../redux/actions/settings';
import * as MarketActions from '../redux/actions/market';
import * as PermissionsActions from '../redux/actions/permissions';

import { AppItem, NotifyItem, StatusBarItem, FeedItem, SearchItem } from '../redux/model';
import { HeaderBar } from './HeaderBar';
import { NotificationPanel } from './NotificationPanel';
import { LoaderPanel } from './LoaderPanel';
import { KeychainPanel } from './KeychainPanel';
import { SettingsPanel } from './SettingsPanel';
import { StatusBar } from './StatusBar';
import { Tray } from './Tray';
import { AppsFeed } from './AppsFeed';
import { IState, Permission, PermissionsPanel } from '../redux/reducers/state';

import * as ROUTES from '../router/routes';

interface AppProps {
  openNotificationPanel: boolean;
  openLoaderPanel: boolean;
  openStatusBarPanel: boolean;
  openPeersBarPanel: boolean;
  openSettingsPanel: boolean;
  openSearchPanel: boolean;
  openKeychainPanel: boolean;
  isHome: boolean;

  trayItems: AppItem[];
  feedItems: FeedItem[];
  notifyItems: NotifyItem[];
  keychainItems: string[];
  keychainSelectedKey: string;
  keychainSuccessMessage: string;
  searchItems: { [index: string]: SearchItem[] };
  statusBarItems?: { [index: string]: StatusBarItem };
  statusBarToggle: () => void;
  peersBarToggle: () => void;
  onToggleKeychainPanel: () => void;
  onTogglePanel: () => any;
  onToggleHome: (openStatus?: boolean) => any;
  onToggleLoaderPanel: () => any;
  onToggleSettingsPanel: () => any;
  onToggleSearch: (openStatus?: boolean) => any;
  keychainCreateKey: (name: string) => void;
  keychainRemoveKey: (name: string) => void;
  keychainSignKey: (name: string) => void;
  keychainSelectKey: (name: string) => void;
  keychainList: () => void;
  keychainLock: () => void;
  keychainUnlock: () => void;
  clearNotification: (id?: number) => void;
  clearAllNotifications: () => void;
  onAddAppItem: (appItem?: AppItem) => any;
  onSwitchDapp: (targetDappName?: string) => any;
  onToggleAppHome: (dappName: string) => any;
  loggerWrite: boolean;
  isProduction: boolean;
  locationPath: string;
  downloadDapp: (ipfsHash: string) => void;
  togglePermission: (permissionName: Permission, checked: boolean, appName: string) => void;
  grantPermissions: (appName: string) => void;
  permissions: PermissionsPanel;
}

class App extends React.Component<AppProps> {

  render() {
    const {
      onTogglePanel, openNotificationPanel, openKeychainPanel, openStatusBarPanel, openPeersBarPanel, openSettingsPanel, openSearchPanel, clearNotification, clearAllNotifications,
      onAddAppItem, onSwitchDapp, onToggleHome, statusBarToggle, peersBarToggle, onToggleKeychainPanel, onToggleAppHome, onToggleSearch, searchItems,
      trayItems, isHome, feedItems, notifyItems,
      keychainItems, keychainSelectedKey, keychainSuccessMessage, keychainCreateKey, keychainUnlock, keychainRemoveKey, keychainLock, keychainList, keychainSignKey, keychainSelectKey,
      statusBarItems, onToggleLoaderPanel, onToggleSettingsPanel, openLoaderPanel, locationPath, loggerWrite,
      downloadDapp, togglePermission, grantPermissions, permissions,
    } = this.props;

    return (
      <div>
        <NotificationPanel
          clearAllNotifications={() => clearAllNotifications()}
          clearNotification={(id: number) => clearNotification(id)}
          items={notifyItems}
          isOpen={openNotificationPanel}
          togglePanel={onTogglePanel}
          key="root-notifications" />
        <LoaderPanel
          isOpen={openLoaderPanel}
          togglePanel={onToggleLoaderPanel}
          key="root-loader" />
        <KeychainPanel
          items={keychainItems}
          selectedKey={keychainSelectedKey}
          successMessage={keychainSuccessMessage}
          isOpen={openKeychainPanel}
          togglePanel={onToggleKeychainPanel}
          createKey={(name) => keychainCreateKey(name)}
          removeKey={(name) => keychainRemoveKey(name)}
          signKey={(name) => keychainSignKey(name)}
          selectKey={(name) => keychainSelectKey(name)}
          listKeys={keychainList}
          lock={keychainLock}
          unlock={keychainUnlock}
          key="root-keychain" />
        <HeaderBar
          isHome={isHome}
          togglePanel={() => onTogglePanel()}
          toggleLoaderPanel={onToggleLoaderPanel}
          toggleHome={() => onToggleHome(true)}
          toggleSettingsPanel={onToggleSettingsPanel}
          searchItems={searchItems}
          isSearchPanelOpen={openSearchPanel}
          toggleSearchPanel={onToggleSearch}
          isStatusBarOpen={openStatusBarPanel}
          toggleStatusBar={statusBarToggle}
          isPeersBarOpen={openPeersBarPanel}
          isSettingsOpen={openSettingsPanel}
          isKeychainPanelOpen={openKeychainPanel}
          isNotificationsPanelOpen={openNotificationPanel}
          isLoaderPanelOpen={openLoaderPanel}
          togglePeersBar={peersBarToggle}
          toggleKeychain={onToggleKeychainPanel}
          key="root-headerbar" />
        <div className="content-zone" key="root-content" id="root-container">

          <Tray items={trayItems} toggleSwitch={onSwitchDapp} togglePeersBar={peersBarToggle} peersBarIsOpen={openPeersBarPanel} statusBarOpen={openStatusBarPanel}/>

          {/* switch between  AppsFeed and SettingsPanel components  */}
          {(() => {
            switch (locationPath) {
              case ROUTES.SETTINGS:
                return <SettingsPanel
                        togglePermission={togglePermission}
                        grantPermissions={grantPermissions}
                        permissions={permissions}
                        feedItems={feedItems}
                      />;

              default:
                return <AppsFeed items={feedItems} switchDapp={onSwitchDapp} downloadDapp={downloadDapp}/>;
            }
          })()}

        </div>
        <StatusBar isOpen={openStatusBarPanel} items={statusBarItems} toggleStatusBar={statusBarToggle} peersBarIsOpen={openPeersBarPanel} loggerWrite={loggerWrite}/>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  notifyItems: state.notification.items,
  keychainItems: state.keychain.items,
  keychainSelectedKey: state.keychain.selectedKey,
  keychainSuccessMessage: state.keychain.successMessage,
  openNotificationPanel: state.isOpen.notification,
  openKeychainPanel: state.isOpen.keychain,
  openLoaderPanel: state.isOpen.loader,
  openStatusBarPanel: state.isOpen.statusBar,
  openPeersBarPanel: state.isOpen.statusBarPeers,
  openSettingsPanel: state.isOpen.settings,
  loggerWrite: state.statusBar.loggerWrite,
  openSearchPanel: state.isOpen.search,
  statusBarItems: state.statusBar.items,
  isHome: state.tray.isHome,
  trayItems: state.tray.items,
  feedItems: state.feed.items,
  searchItems: state.search.items,
  permissions: state.permissions,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onTogglePanel: NotificationActions.toggle,
  clearNotification: NotificationActions.clearNotification,
  clearAllNotifications: NotificationActions.clearAllNotifications,
  onToggleLoaderPanel: LoaderActions.toggle,
  onToggleSettingsPanel: SettingsActions.toggle,
  statusBarToggle: StatusBarActions.toggle,
  peersBarToggle: StatusBarActions.togglePeers,
  onToggleKeychainPanel: KeychainActions.toggle,
  keychainCreateKey: KeychainActions.createKey,
  keychainRemoveKey: KeychainActions.removeKey,
  keychainSignKey: KeychainActions.signKey,
  keychainUnlock: KeychainActions.unlockKey,
  keychainSelectKey: KeychainActions.selectKey,
  keychainList: KeychainActions.list,
  keychainLock: KeychainActions.lock,
  onAddAppItem: TrayActions.addAppItem,
  onSwitchDapp: TrayActions.switchDapp,
  onToggleHome: TrayActions.toggleHome,
  onToggleAppHome: TrayActions.toggleAppHome,
  onToggleSearch: SearchActions.toggle,
  downloadDapp: MarketActions.downloadDapp,
  togglePermission: PermissionsActions.togglePermission,
  grantPermissions: PermissionsActions.grantPermissions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
