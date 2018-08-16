import * as React from "react";
import { slide as Menu, Props as MenuProps } from "react-burger-menu";
import { NotifyItem } from "../../redux/model";
import { NotifyGroup } from "./NotifyGroup";

// assets
const filterIcon = require("../../assets/icons/filter.svg")

interface NotificationPanelProps {
  isOpen?: boolean;
  items?: NotifyItem[];
  togglePanel?(openStatus: boolean): void;
  clearNotificationGroup?(groupId: number): void;
}

export class NotificationPanel extends React.Component<NotificationPanelProps> {
  constructor(props: NotificationPanelProps) {
    super(props)
    this.getList = this.getList.bind(this);
  }

  private getList(): JSX.Element[] | JSX.Element {
    const { items } = this.props

    if (!items ) {
      return (
        <div className="empty">

        </div>
      )
    } else {
      return items.map((item, index) => (
        <NotifyGroup
          key={`${item.created.getTime()}-${index}`}
          items={items}
          groupId={index}
          clearNotificationGroup={this.props.clearNotificationGroup}
        />
      ))
    }
  }

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
          <div className="groups">
            {this.getList()}
          </div>
        </div>
      </Menu>
    )
  }
}
 

