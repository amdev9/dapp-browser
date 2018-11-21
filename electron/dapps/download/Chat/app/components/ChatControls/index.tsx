import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import { RoomComponentStore } from '../../services/RoomStoreService';
import * as constants from '../../redux/constants/index';

import './styles.css';

type FormProps<P> = P & InjectedFormProps<{}, P>;

interface StateProps {
  selectedRoom: string;
}

const mapStateToProps = (state: any): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
});

class ChatControls extends React.Component<FormProps<StateProps>> {
  messageInput: any;

  async handleSubmit(values: any) {
    const { reset, selectedRoom } = this.props;
    const room = RoomComponentStore.getRoomById(selectedRoom);

    if (room && values.message) {
      try {
        await room.sendMessageBroadcast(values.message);
      } catch (error) {
        console.error(error);
      }
      reset && reset();
    }

    this.focus();
  }

  focus() {
    if (this.messageInput && this.messageInput.getRenderedComponent) {
      this.messageInput.getRenderedComponent().focus();
    }
  }

  render() {
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
}

const form: any = reduxForm<{}, StateProps>({ form: constants.CHAT_PAGE_MESSAGE_FORM })(ChatControls);
export default connect(mapStateToProps, null)(form);
