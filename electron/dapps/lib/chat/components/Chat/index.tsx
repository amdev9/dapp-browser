import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import * as cn from 'classnames';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
import { Chat as ArrayChat } from '../../../';

import './styles.css';

const ON_JOIN_USER_MESSAGE = 'User has joined'
const ON_LEFT_USER_MESSAGE = 'User has left'

const mapStateToProps = (state: any) => ({
  selectedRoom: state.main.selectedRoom,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: () => {
  },
});

class Chat extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      chat: null,
      myId: null,
      messages: [],
    };
  }

  componentDidMount() {
    const { selectedRoom } = this.props;

    const chat = new ArrayChat();
    chat.subscribe(selectedRoom, {
      onSubscribe: (peerId) => {
        console.log('myid', peerId);
        this.setState({ myId: peerId });
      },
      onMessage: (message) => {
        this.setState({
          messages: [
            ...this.state.messages,
            this.formatMessage(message)
          ]
        });
      },
      onLeft: (peer) => {
        this.setState({
          messages: [
            ...this.state.messages,
            this.formatMessage({ from: peer, data: ON_LEFT_USER_MESSAGE })
          ]
        });
      },
      onJoined: (peer) => {
        this.setState({
          messages: [
            ...this.state.messages,
            this.formatMessage({ from: peer, data: ON_JOIN_USER_MESSAGE })
          ]
        });
      },
    });
    this.setState({ chat });
  }

  formatMessage(message: { from: string, data: Buffer }) {
    return {
      from: message.from,
      message: message.data.toString(),
    };
  }

  componentWillUnmount() {
    if (this.state.chat) {
      this.state.chat.leave();
      console.log('leave from', this.props.selectedRoom)
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
  }

  renderMessageBlock(msg: any, i: number) {
    const { myId } = this.state
    const selfMessage = myId && msg.from === myId;

    return (
      <div
        className={cn('messageBlock', { messageBlock_selfMessage: selfMessage })}
        key={i}
      >
        { !selfMessage && <div className="messageBlockFrom">{msg.from}</div> }
        <div className="messageBlockContent">{msg.message}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, selectedRoom } = this.props;
    const { messages } = this.state;

    return (
      <div className="chatWrapper">
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
        <div className="chatWindow">
          { messages && messages.map((msg: any, i: number) => this.renderMessageBlock(msg, i)) }
        </div>
        <form
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}
          className="chatControls"
        >
          <Field
            name="message"
            type="text"
            className="chatControlsInput"
            component="input"
            placeholder="Enter message..."
          />
          <button
            className="chatControlsSubmit"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

const m: any = Chat;
const form: any = reduxForm({ form: constants.CHAT_PAGE_MESSAGE_FORM })(m);
export default connect(mapStateToProps, mapDispatchToProps)(form);
