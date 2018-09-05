import * as React from "react";

import { NotificationWidget } from './NotificationWidget';
import { HomeWidget } from './HomeWidget';
import { DownloadWidget } from './DownloadWidget';

interface HeaderBarProps {
  isOpen?: boolean,
  togglePanel?(): void,
  toggleLoaderPanel?(): void,
  toggleHome?(): void
}
export class HeaderBar extends React.Component<HeaderBarProps> {
  public render() {
    const { togglePanel, toggleHome, isOpen, toggleLoaderPanel } = this.props;
    return (
      <div className="headerbar">
        <HomeWidget toggleHome={toggleHome}/>
        <div className="title" title="hello">
          Home
        </div>

        <div className="actions">
          {/* <SuggestSearch /> */}

          <div className="unions">
            <div className="network">
              MAINNET
            </div>

            {/* <Keychain /> */}
            {/* <Settings /> */}

            <NotificationWidget isOpen togglePanel={togglePanel} />
            <DownloadWidget isOpen togglePanel={toggleLoaderPanel} />
          </div>
        </div>
      </div>
    )
  }
}
