import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

const ArrayIO = require('array-io');

import { RoomComponentStore } from '../../services/RoomComponentService';
import * as constants from '../../redux/constants/index';
import { IState } from '../../redux/reducers';
import { getHashLink } from '../../utils';

import * as PaperClipSvg from '../../images/paperclip.svg';
import './styles.css';

type FormProps<P> = P & InjectedFormProps<{}, P>;

interface StateProps {
  selectedRoom: string | null;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
});

class ChatControls extends React.Component<FormProps<StateProps>> {
  messageInput: any;

  async handleSubmit(values: any) {
    const { reset, selectedRoom } = this.props;

    if (!selectedRoom) {
      return;
    }
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

  async onClickFileAttach() {
    const { selectedRoom } = this.props;

    try {
      if (!selectedRoom) {
        return;
      }
      const fileEntry = await ArrayIO.FileManager.openFile();
      console.log('fileEntry', fileEntry);
      if (!fileEntry || !fileEntry.id) {
        throw Error('File entry incorrect');
      }
      const ipfsEntry = await ArrayIO.IpfsStorage.uploadIpfsFile(fileEntry.id);
      console.log('upload', ipfsEntry);

      const room = RoomComponentStore.getRoomById(selectedRoom);

      if (room) {
        const ipfsLink = getHashLink(ipfsEntry.hash, ipfsEntry.fileName);
        await room.sendMessageBroadcast(ipfsLink);
      }
    } catch (err) {
      console.log('FileAttachError', err);
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit.bind(this))}
        className="chatControls"
      >
        <button
          className="chatControlsAttachButton"
          type="button"
          onClick={this.onClickFileAttach.bind(this)}
        >
          <img src={PaperClipSvg} className="chatControlsAttachImage" width={20}/>
        </button>
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

const form: any = reduxForm<{}, StateProps>({ form: constants.FORM_CHAT_SUBMIT_MESSAGE })(ChatControls);
export default connect(mapStateToProps)(form);
