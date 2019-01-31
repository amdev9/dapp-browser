import * as React from 'react';
import { connect } from 'react-redux';
import * as cn from 'classnames';
import * as models from '../../redux/models';
import { getSelectedRoomMessages } from '../../redux/selectors';
import { IState } from '../../redux/reducers';
import ChatMessage from '../ChatMessage';

import './styles.css';

interface StateProps {
  messages: models.MessageEntity[];
}

const mapStateToProps = (state: IState): StateProps => ({
  messages: getSelectedRoomMessages(state),
});

class ChatWindow extends React.Component<StateProps> {
  chatWindowEnd: any;

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatWindowEnd) {
      this.chatWindowEnd.scrollIntoView(false);
    }
  }

  renderMessageBlock(msgEntity: models.MessageEntity, i: number) {
    const { message } = msgEntity;
    console.log('renderMessageBlock', msgEntity);

    return (
      <div
        className={cn('messageBlock', { messageBlock_selfMessage: message.own })}
        key={i}
      >
        {!message.own && <div className="messageBlockFrom">{message.from}</div>}
        <div className="messageBlockContent">
          <ChatMessage message={message.message}/>
        </div>
      </div>
    );
  }

  renderEmpty() {
    return <div className="chatWindowEmpty">Message list is empty</div>;
  }

  render() {
    const { messages } = this.props;

    if (!messages || !messages.length) {
      return this.renderEmpty();
    }

    return (
      <div className="chatWindow">
        {messages && messages.map((msgEntity, i) => this.renderMessageBlock(msgEntity, i))}
        <div ref={(ref) => {
          this.chatWindowEnd = ref;
        }}/>
      </div>
    );
  }
}

export default connect<StateProps, {}>(mapStateToProps)(ChatWindow);
