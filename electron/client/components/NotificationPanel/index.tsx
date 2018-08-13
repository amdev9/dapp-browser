import * as React from "react";
import { slide as Menu, Props as MenuProps } from "react-burger-menu"

// assets
const filterIcon = require("../../assets/icons/filter.svg")

interface NotificationPanelProps {
  isOpen?: boolean,
  togglePanel?(openStatus: boolean): void
}

export class NotificationPanel extends React.Component<NotificationPanelProps> { 
  render() {
    const { isOpen, togglePanel } = this.props;

    const menuProps: MenuProps = {
      outerContainerId: "root-container",
      pageWrapId: "content-wrap",
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen: isOpen,
      onStateChange: (value) => {
        if (isOpen !== value.isOpen) {
          togglePanel(value.isOpen);
        }
      },
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
 

