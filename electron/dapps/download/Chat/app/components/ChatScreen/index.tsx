import * as React from 'react';
import { connect } from 'react-redux';

import ChatView from '../ChatView';
import RoomsList from '../RoomList';
import CreateRoom from '../CreateRoomScreen';
import * as actions from '../../redux/actions';

import './styles.css';

interface State {
  roomList: any[];
}

interface StateProps {
  selectedRoom: string;
  roomList: string[];
}

interface DispatchProps {
  selectRoom: (roomId: string) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: any): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
  roomList: Object.keys(state.rooms.roomList),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  selectRoom: (roomId: string) => dispatch(actions.selectRoom(roomId))
});

class Chat extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      roomList: [],
    };
  }

  render() {
    const { selectedRoom } = this.props;

    return (
      <div className="chatScreen">
        <RoomsList/>
        {selectedRoom ? <ChatView/> : <CreateRoom/>}
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Chat);
