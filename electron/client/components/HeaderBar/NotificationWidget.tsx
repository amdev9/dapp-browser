import * as React from 'react';

const notificationIcon = require('../../assets/icons/notification.svg');
const notificationIconActive = require('../../assets/icons/notification_active.svg');

interface NotificationWidgetProps {
  togglePanel(): void;
  isOpen: boolean;
}
export class NotificationWidget extends React.Component<NotificationWidgetProps> {
  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? notificationIconActive : notificationIcon;
    return (
      <div className="notifications" onClick={() => togglePanel()}>
        <img className="icon" src={icon} />
      </div>
    );
  }
}
