import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import * as cn from 'classnames';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
import { Chat as ArrayChat } from '../../../';

import './styles.css';

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
      messages: [{
        from: 'QmfV4a3ok6gWdYixGvNvx57Kd1WtFtFvc7L6iaygbYKGqQ',
        message: 'ololo'
      },
        {
          from: 'QmfV4a3ok6gWdYixGvNvx57Kd1WtFtFvc7L6iaygbYKGqQ',
          message: 'alala'
        }
        ],
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
        console.log('CHAT:message', message);
        this.setState({
          messages: [
            ...this.state.messages,
            this.formatMessage(message)
          ]
        });
      },
      onLeft: (peer) => console.log('CHAT:onleft', peer),
      onJoined: (peer) => console.log('CHAT:onjoined', peer),
    });
    this.setState({ chat });
  }

  formatMessage(message: { from: string, data: Buffer }) {
    return {
      from: message.from,
      message: message.data.toString(),
    };
  }

  renderMessage() {

  }

  componentWillUnmount() {
    if (this.state.chat) {
      this.state.chat.leave();
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
          <span>{selectedRoom}</span>
          <button onClick={actions.navigateToMain}>Close chat</button>
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
