import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgressbar from 'react-circular-progressbar';

const DappIO = require('dapp-io');

import './styles.css';
import { RoomComponentStore } from '../../../services/RoomComponentService';
import { IState } from '../../../redux/reducers';
import * as utils from '../../../utils';
import * as actions from '../../../redux/actions';

interface State {
  progress: number;
  uploadError: null | Error;
}
interface IProps {
  fileentryid: string;
  messageid: string;
}

interface UploadEntity {
  messageid: string;
  fileentryid: string;
}

interface StateProps {
  selectedRoom: string | null;
}

interface DispatchProps {
  removeRoomMessage: (roomId: string | null, messageId: string) => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => bindActionCreators({
  removeRoomMessage: actions.removeRoomMessage,
}, dispatch);

class IpfsUploadLink extends React.Component<IProps & StateProps & DispatchProps, State> {
  static uploadsList: UploadEntity[] = [];

  constructor(props: IProps & StateProps & DispatchProps) {
    super(props);

    this.state = {
      progress: 0,
      uploadError: null,
    };
  }

  async componentDidMount() {
    const { fileentryid, messageid, removeRoomMessage, selectedRoom } = this.props;

    try {
      const ipfsEntry = await DappIO.IpfsStorage.uploadIpfsFile(fileentryid, (progress: number) => {
        this.setState({ progress });
      });
      removeRoomMessage(selectedRoom, messageid);
      await this.sendUploadedFileLink(ipfsEntry.hash, ipfsEntry.fileName);
    } catch (error) {
      removeRoomMessage(selectedRoom, messageid);
      this.setState({ uploadError: error });
    }
  }

  async sendUploadedFileLink(hash: string, fileName: string) {
    const { selectedRoom } = this.props;

    try {
      const room = RoomComponentStore.getRoomById(selectedRoom);

      if (room) {
        const ipfsLink = utils.getHashLink(hash, fileName);
        await room.sendMessageBroadcast(ipfsLink);
      }
    } catch (error) {
      this.setState({ uploadError: error });
    }
  }

  renderProgress() {
    const { progress } = this.state;

    return (
      <div className="ipfs-uploading">
        <CircularProgressbar
          percentage={progress}
          styles={{
            path: { stroke: `rgba(255, 255, 255, ${progress / 100})` },
          }}
        />
        <div className="ipfs-uploading-progress">
          {Math.round(progress)}%
        </div>
      </div>
    );
  }

  async onClick(e: any) {

  }

  render() {
    return (
      <div
        className="ipfs-link">
        File uploading...
        {this.renderProgress()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpfsUploadLink);
