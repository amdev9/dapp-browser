import * as React from "react"
 
const notificationIcon = require("../../assets/icons/notification.svg")
 
interface NotificationWidgetProps {
  isOpen?: boolean;
  togglePanel?(): void
}
export class NotificationWidget extends React.Component<NotificationWidgetProps> {
  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked notification');
    this.props.togglePanel();
  }

  public render() {
    const { togglePanel } = this.props;
    return (
      <div className="notifications" onClick={this.handleClick}>
        <img className="icon" src={notificationIcon} />
      </div>
    )
  }
}

 