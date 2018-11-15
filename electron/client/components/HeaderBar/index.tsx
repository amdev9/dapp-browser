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
  toggleSearchPanel(): void;
  togglePanel(): void;
  toggleLoaderPanel(): void;
  toggleHome(): void;
  toggleStatusBar(): void;
  togglePeersBar(): void;
  toggleKeychain(): void;
}
export class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const {
      togglePanel,
      toggleLoaderPanel,
      toggleKeychain,
      toggleHome,
      searchItems,
      toggleSearchPanel,
      isSearchPanelOpen,
      isStatusBarOpen,
      toggleStatusBar,
      isPeersBarOpen,
      togglePeersBar,
    } = this.props;
    return (
      <div className="headerbar">
        <HomeWidget toggleHome={toggleHome} />
        <div className="title" title="hello">
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
            <KeychainWidget togglePanel={toggleKeychain} />
            <SettingsWidget toggleHome={toggleHome} />
            <NotificationWidget togglePanel={togglePanel} />
            <DownloadWidget togglePanel={toggleLoaderPanel} />
          </div>
        </div>
      </div>
    );
  }
}
