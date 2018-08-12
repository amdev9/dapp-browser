import * as React from "react"
 
const notificationIcon = require("../../assets/icons/notification.svg")
 
interface NotificationWidgetState {
  isOpen: boolean;
}
export class NotificationWidget extends React.Component<{}, NotificationWidgetState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( ) {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    })); 
    console.log('clicked notification', this.state);
  }

  public render() {
    return (
      <div className="notifications" onClick={() => this.handleClick()}>
        <img className="icon" src={notificationIcon} />
      </div>
    )
  }
}

 