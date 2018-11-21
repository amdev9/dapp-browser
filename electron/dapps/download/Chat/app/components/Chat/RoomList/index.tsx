import * as React from 'react';
import { connect } from "react-redux";
import * as cn from 'classnames';

import { RoomComponent } from '../../../services/RoomStoreService';
import { getRoomListSelector } from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
import { IState } from "../../../redux/reducers";
import { Room } from "../../../redux/reducers/rooms";

import './styles.css';

interface StateProps {
  selectedRoom: string | null;
  roomList: Room[];
}

interface DispatchProps {
  selectRoom: (roomId: string) => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
  roomList: getRoomListSelector(state),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  selectRoom: (roomId: string) => dispatch(actions.selectRoom(roomId)),
});

type Props = StateProps & DispatchProps;

class RoomList extends React.Component<Props> {
  renderRoom(room: Room, i: number) {
    const { selectRoom, selectedRoom } = this.props;
    const isSelectedRoom = selectedRoom === room.roomId;

    return (
      <div
        key={i}
        className={cn('roomListItem', { roomListItem_active: isSelectedRoom })}
        onClick={() => selectRoom(room.roomId)}
      >
        {room.roomName}
      </div>
    );
  }

  renderRoomList() {
    const { roomList } = this.props;

    if (!roomList || !roomList.length) {
      return 'Room list is empty';
    }

    console.log('roomlist', roomList)

    return roomList && roomList.map(this.renderRoom.bind(this));
  }

  render() {

    return (
      <div className="roomList">
        {this.renderRoomList()}
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RoomList);
