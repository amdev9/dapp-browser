import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/reducers/state';
import { bindActionCreators, Dispatch } from 'redux';

import { actions as NotificationActions, selectors as NotificationSelectors } from '../../modules/Notification';

const notificationIcon = require('../../assets/icons/notification.svg');
const notificationIconActive = require('../../assets/icons/notification_active.svg');

interface NotificationWidgetProps {
  togglePanel(): void;

  notificationCounter: number;
  isOpen: boolean;
}

const mapStateToProps = (state: IState) => ({
  isOpen: state.isOpen.notification,
  notificationCounter: NotificationSelectors.getUnshownNotificationsCounter(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  togglePanel: NotificationActions.toggle,
}, dispatch);

class NotificationWidget extends React.Component<NotificationWidgetProps> {
  renderNotificationCounter() {
    const { notificationCounter } = this.props;
    console.log('renderselector', notificationCounter);
    if (!notificationCounter) {
      return null;
    }

    return (
      <div className="notification-counter">
        {notificationCounter}
      </div>
    );
  }

  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? notificationIconActive : notificationIcon;
    return (
      <div className="notifications" onClick={() => togglePanel()}>
        <img className="icon" src={icon}/>
        {this.renderNotificationCounter()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationWidget);
