import * as React from "react";
import { NotificationWidget } from './NotificationWidget';
import { HomeWidget } from './HomeWidget';
import { DownloadWidget } from './DownloadWidget';
import { SettingsWidget } from './SettingsWidget';
import { NetworkWidget } from './NetworkWidget';
import { SuggestSearch } from './SuggestSearch';
import {SearchItem} from "../../redux/model";

interface HeaderBarProps {
  isOpen?: boolean,
  searchItems: { [index: string]: SearchItem[] },
  isSearchPanelOpen: boolean,
  isSettingsPanelOpen: boolean,
  isStatusBarOpen: boolean,
  isPeersBarOpen: boolean,
  toggleSearchPanel(): void,
  toggleSettingsPanel?(): void,
  togglePanel?(): void,
  toggleLoaderPanel?(): void,
  toggleHome?(): void
  toggleStatusBar(): void
  togglePeersBar(): void
}
export class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const {
      togglePanel,
      toggleHome,
      toggleLoaderPanel,
      toggleSettingsPanel,
      searchItems,
      toggleSearchPanel,
      isSearchPanelOpen,
      isSettingsPanelOpen,
      isStatusBarOpen,
      toggleStatusBar,
      isPeersBarOpen,
      togglePeersBar
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
            {/* <Keychain /> */}
            <SettingsWidget /*isOpen*/ toggleHome={toggleHome} />
            <NotificationWidget isOpen togglePanel={togglePanel} />
            <DownloadWidget isOpen togglePanel={toggleLoaderPanel} />
          </div>
        </div>
      </div>
    )
  }
}
