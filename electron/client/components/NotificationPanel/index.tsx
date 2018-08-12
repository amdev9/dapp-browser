import * as React from "react";
import { slide as Menu, Props as MenuProps } from "react-burger-menu"
 
// assets
const filterIcon = require("../../assets/icons/filter.svg")

export class NotificationPanel extends React.Component { 
  render() {
    const menuProps: MenuProps = {
      outerContainerId: "root-container",
      pageWrapId: "content-wrap",
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen: true
    }

    return (
      <Menu {...menuProps}>
        <div className="notifications-popup">
          <div className="header">
            <h4>Notifications</h4>
            <div className="filter">
              <img src={filterIcon} />
            </div>
          </div>
        </div>
      </Menu>
    )
  }
}


