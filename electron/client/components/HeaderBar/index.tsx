import * as React from "react"
 
const notificationIcon = require("../../assets/icons/notification.svg")
const homeIcon = require("../../assets/icons/home.svg")
 
export class HeaderBar extends React.Component { 
  public render() {
    return (
      <div className="headerbar">
        <div className="header">
          <img className="icon" src={homeIcon} />
        </div>

        <div className="title">
          HOME
        </div>

        <div className="actions">
          {/* <SuggestSearch /> */}

          <div className="unions">
            <div className="network">
              MAINNET
            </div>

            {/* <Keychain /> */}
            {/* <Settings /> */}

            <div className="notifications">
              <img className="icon" src={notificationIcon} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
