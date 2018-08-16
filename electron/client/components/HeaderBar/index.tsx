import * as React from "react";
 
import { NotificationWidget } from './NotificationWidget';
 
const homeIcon = require("../../assets/icons/home.svg");
 
interface HeaderBarProps {
  isOpen?: boolean,
  togglePanel?(): void
}
export class HeaderBar extends React.Component<HeaderBarProps> { 
  public render() {
    return (
      <div className="headerbar">
        <div className="header">
          <img className="icon" src={homeIcon} />
        </div>

        <div className="title">
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

            <NotificationWidget {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
