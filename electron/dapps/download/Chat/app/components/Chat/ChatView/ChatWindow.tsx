import * as React from 'react';
import { connect } from 'react-redux';
import * as cn from 'classnames';
import { Message } from '../../../services/RoomStoreService';
import { getSelectedRoomMessages } from '../../../redux/selectors';

interface StateProps {
  messages: Message[];
}

const mapStateToProps = (state: any): StateProps => ({
  messages: getSelectedRoomMessages(state),
});

class ChatHeader extends React.Component<StateProps> {
  chatWindowEnd: any;

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatWindowEnd) {
      this.chatWindowEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderMessageBlock(msg: Message, i: number) {
    return (
      <div
        className={cn('messageBlock', { messageBlock_selfMessage: msg.own })}
        key={i}
      >
        {!msg.own && <div className="messageBlockFrom">{msg.from}</div>}
        <div className="messageBlockContent">{msg.message}</div>
      </div>
    );
  }

  render() {
    const { messages } = this.props;

    console.log('chatwindow', messages)
    return (
      <div className="chatWindow">
        {messages && messages.map((msg: any, i: number) => this.renderMessageBlock(msg, i))}
        <div ref={(ref) => {
          this.chatWindowEnd = ref;
        }}/>
      </div>
    );
  }
}

export default connect<StateProps, {}>(mapStateToProps)(ChatHeader);
