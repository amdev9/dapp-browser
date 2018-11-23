import * as React from 'react';
import { connect } from 'react-redux';

import ChatView from '../ChatView';
import RoomsList from '../RoomList';
import CreateRoom from '../CreateRoomScreen';
import { IState } from '../../redux/reducers';

import './styles.css';

interface State {
  roomList: any[];
}

interface StateProps {
  selectedRoom: string | null;
  roomList: string[];
}

type Props = StateProps;

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
  roomList: Object.keys(state.rooms.roomList),
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

export default connect<StateProps>(mapStateToProps)(Chat);
