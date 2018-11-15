import * as React from 'react';

const notificationIcon = require('../../assets/icons/notification.svg');

interface NotificationWidgetProps {
  togglePanel(): void;
}
export class NotificationWidget extends React.Component<NotificationWidgetProps> {
  public render() {
    const { togglePanel } = this.props;
    return (
      <div className="notifications" onClick={() => togglePanel()}>
        <img className="icon" src={notificationIcon} />
      </div>
    );
  }
}
