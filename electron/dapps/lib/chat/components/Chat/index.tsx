import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import * as cn from 'classnames';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
import { Chat as ArrayChat } from '../../../baseClasses';

import './styles.css';

const ON_JOIN_USER_MESSAGE = 'User has joined';
const ON_LEFT_USER_MESSAGE = 'User has left';

const mapStateToProps = (state: any) => ({
  selectedRoom: state.main.selectedRoom,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: () => {
  },
});

class Chat extends React.Component<any, any> {
  chatWindowEnd: any;
  messageInput: any;

  constructor(props: any) {
    super(props);

    this.state = {
      chat: null,
      myId: null,
      messages: [],
      isChatCreating: true,
      chatCreateSuccess: null,
      chatCreateFailure: null,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.selectedRoom !== nextProps.selectedRoom) {
      this.subscribeRoom(nextProps.selectedRoom);
    }
    console.log('willrecprops', nextProps.selectedRoom, this.props.selectedRoom);
  }

  async subscribeRoom(selectedRoom: string) {
    if (!selectedRoom) {
      return;
    }

    this.setState({
      isChatCreating: true,
      messages: [],
    });

    if (this.state.chat) {
      this.state.chat.leave();
    }

    try {
      const chat = new ArrayChat();
      this.setState({ chat });
      await chat.subscribe(selectedRoom, {
        onSubscribe: (peerId) => {
          console.log('myid', peerId);
          this.setState({
            myId: peerId,
            isChatCreating: false,
            chatCreateSuccess: true,
          });
        },
        onMessage: (message) => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.formatMessage(message)
            ]
          }, () => {
            this.scrollToBottom();
            this.focus();
          });
        },
        onLeft: (peer) => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.formatMessage({ from: peer, data: ON_LEFT_USER_MESSAGE })
            ]
          }, () => {
            this.scrollToBottom();
            this.focus();
          });
        },
        onJoined: (peer) => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.formatMessage({ from: peer, data: ON_JOIN_USER_MESSAGE })
            ]
          }, () => {
            this.scrollToBottom();
            this.focus();
          });
        },
      });
    } catch (error) {
      this.setState({ chatCreateFailure: error && error.message || 'Error', isChatCreating: false });
    }

    this.focus();
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.subscribeRoom(this.props.selectedRoom);

  }

  formatMessage(message: { from: string, data: Buffer | string }) {
    return {
      from: message.from,
      message: message.data.toString(),
    };
  }

  componentWillUnmount() {
    if (this.state.chat) {
      this.state.chat.leave();
      console.log('leave from', this.props.selectedRoom);
    }
  }

  handleSubmit(values: any) {
    const { chat } = this.state;
    const { reset } = this.props;

    console.log('values', values.message, this.props);
    if (chat && values.message) {
      chat.sendMessageBroadcast(values.message);
      reset && reset();
    }

    this.focus();
  }

  scrollToBottom() {
    if (this.chatWindowEnd) {
      this.chatWindowEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderMessageBlock(msg: any, i: number) {
    const { myId } = this.state;
    const selfMessage = myId && msg.from === myId;

    return (
      <div
        className={cn('messageBlock', { messageBlock_selfMessage: selfMessage })}
        key={i}
      >
        {!selfMessage && <div className="messageBlockFrom">{msg.from}</div>}
        <div className="messageBlockContent">{msg.message}</div>
      </div>
    );
  }

  renderChatNavigation() {
    const { selectedRoom } = this.props;

    return (
      <div className="chatNavigation">
        <h1>
          {selectedRoom}
          <button
            className="roomLeftButton"
            onClick={actions.navigateToMain}>
            Leave room
          </button>
        </h1>
      </div>
    );
  }

  renderChatWindow() {
    const { messages } = this.state;

    return (
      <div className="chatWindow">
        {messages && messages.map((msg: any, i: number) => this.renderMessageBlock(msg, i))}
        <div ref={(ref) => {
          this.chatWindowEnd = ref;
        }}></div>
      </div>
    );
  }

  renderChatControls() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit.bind(this))}
        className="chatControls"
      >
        <Field
          name="message"
          type="text"
          ref={(ref: any) => {
            this.messageInput = ref;
          }}
          className="chatControlsInput"
          component="input"
          placeholder="Enter message..."
          autoFocus
          withRef
        />
        <button
          className="chatControlsSubmit"
          type="submit"
        >
          Send
        </button>
      </form>
    );
  }

  focus() {
    console.log('rerere', this.messageInput);
    if (this.messageInput && this.messageInput.getRenderedComponent) {
      this.messageInput.getRenderedComponent().focus();
    }
  }

  renderLoading() {
    return (
      <div className="chatWrapper">
        <div className="chatLoadingBlock">Opening chat room...</div>
      </div>
    );
  }

  renderError() {
    const { chatCreateFailure } = this.state;

    return (
      <div className="chatWrapper">
        <div className="chatError">
          <div className="chatErrorTitle">Open chat room error:</div>
          <div>{chatCreateFailure}</div>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, selectedRoom } = this.props;
    const { messages, isChatCreating, chatCreateSuccess, chatCreateFailure } = this.state;

    if (isChatCreating) {
      return this.renderLoading();
    }

    if (chatCreateFailure) {
      return this.renderError();
    }

    return (
      <div className="chatWrapper">
        {this.renderChatNavigation()}
        {this.renderChatWindow()}
        {this.renderChatControls()}
      </div>
    );
  }
}

const m: any = Chat;
const form: any = reduxForm({ form: constants.CHAT_PAGE_MESSAGE_FORM })(m);
export default connect(mapStateToProps, mapDispatchToProps)(form);
