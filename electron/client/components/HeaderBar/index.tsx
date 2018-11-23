import * as React from 'react';
import { NotificationWidget } from './NotificationWidget';
import { HomeWidget } from './HomeWidget';
import { DownloadWidget } from './DownloadWidget';
import { SettingsWidget } from './SettingsWidget';
import { NetworkWidget } from './NetworkWidget';
import { SuggestSearch } from './SuggestSearch';
import { KeychainWidget } from './KeychainWidget';
import { SearchItem } from '../../redux/model';

interface HeaderBarProps {
  searchItems: { [index: string]: SearchItem[] };
  isSearchPanelOpen: boolean;
  isStatusBarOpen: boolean;
  isPeersBarOpen: boolean;
  isSettingsOpen: boolean;
  isNotificationsPanelOpen: boolean;
  isLoaderPanelOpen: boolean;
  isKeychainPanelOpen: boolean;
  toggleSearchPanel(): void;
  togglePanel(): void;
  toggleLoaderPanel(): void;
  toggleHome(): void;
  toggleStatusBar(): void;
  toggleSettingsPanel(): void;
  togglePeersBar(): void;
  toggleKeychain(): void;
  isHome: boolean;
}
export class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const {
      togglePanel,
      toggleLoaderPanel,
      toggleKeychain,
      toggleSettingsPanel,
      toggleHome,
      searchItems,
      toggleSearchPanel,
      isSearchPanelOpen,
      isStatusBarOpen,
      isSettingsOpen,
      isNotificationsPanelOpen,
      isLoaderPanelOpen,
      isKeychainPanelOpen,
      toggleStatusBar,
      isPeersBarOpen,
      togglePeersBar,
      isHome,
    } = this.props;
    return (
      <div className="headerbar">
        <HomeWidget toggleHome={toggleHome} isHome={isHome}/>
        <div className="title">
          Home
        </div>
        <div className="actions">
          <SuggestSearch
            searchItems={searchItems}
            togglePanel={toggleSearchPanel}
            isOpen={isSearchPanelOpen}
            isStatusBarOpen={isStatusBarOpen}
            toggleStatusBar={toggleStatusBar}
            isPeersBarOpen={isPeersBarOpen}
            togglePeersBar={togglePeersBar}
          />
          <div className="unions">
            <NetworkWidget />
            <KeychainWidget togglePanel={toggleKeychain} isOpen={isKeychainPanelOpen}/>
            <SettingsWidget togglePanel={toggleSettingsPanel} isOpen={isSettingsOpen}/>
            <NotificationWidget togglePanel={togglePanel} isOpen={isNotificationsPanelOpen}/>
            <DownloadWidget togglePanel={toggleLoaderPanel} isOpen={isLoaderPanelOpen}/>
          </div>
        </div>
      </div>
    );
  }
}
