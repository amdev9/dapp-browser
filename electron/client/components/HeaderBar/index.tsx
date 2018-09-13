import * as React from "react";
import { NotificationWidget } from './NotificationWidget';
import { HomeWidget } from './HomeWidget';
import { DownloadWidget } from './DownloadWidget';
import { SettingsWidget } from './SettingsWidget';
import { NetworkWidget } from './NetworkWidget';

interface HeaderBarProps {
  isOpen?: boolean,
  toggleSettingsPanel?(): void,
  togglePanel?(): void,
  toggleLoaderPanel?(): void,
  toggleHome?(): void
}
export class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const { togglePanel, toggleHome, toggleLoaderPanel, toggleSettingsPanel } = this.props;
    return (
      <div className="headerbar">
        <HomeWidget toggleHome={toggleHome} />
        <div className="title" title="hello">
          Home
        </div>
        <div className="actions">
          {/* <SuggestSearch /> */}
          <div className="unions">
            <NetworkWidget />
            {/* <Keychain /> */}
            <SettingsWidget isOpen togglePanel={toggleSettingsPanel} />
            <NotificationWidget isOpen togglePanel={togglePanel} />
            <DownloadWidget isOpen togglePanel={toggleLoaderPanel} />
          </div>
        </div>
      </div>
    )
  }
}
