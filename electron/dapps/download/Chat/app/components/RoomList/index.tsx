import * as React from 'react';
import { connect } from 'react-redux';
import * as cn from 'classnames';

import * as actions from '../../redux/actions';
import * as thunks from '../../redux/thunks';
import { IState } from '../../redux/reducers';
import { Room } from '../../redux/reducers/rooms';
import RoomsSearch from '../RoomsSearch/index';

import './styles.css';

interface StateProps {
  selectedRoom: string | null;
  roomList: Room[];
  filteredRoomList: Room[] | null;
}

interface DispatchProps {
  selectRoom: (roomId: string) => void;
  roomRemove: (roomId: string) => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
  roomList: state.rooms.roomList,
  filteredRoomList: state.rooms.filteredRoomList,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  selectRoom: (roomId: string) => dispatch(thunks.selectRoom(roomId)),
  roomRemove: (roomId: string) => dispatch(thunks.roomRemoveThunk(roomId)),
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
        <div className="roomListRoomName">{room.roomName}</div>
        {room.unreadMessagesCount ? (
          <div className="roomListRoomUnreadMessages">
            {room.unreadMessagesCount}
          </div>
        ) : null}
      </div>
    );
  }

  renderEmpty() {
    return <div className="roomListEmpty">Room list is empty</div>;
  }

  renderFilteredRoomList(filteredRoomList: Room[]) {
    if (!filteredRoomList.length) {
      return this.renderEmpty();
    }

    return filteredRoomList.map(this.renderRoom.bind(this));
  }

  renderRoomList() {
    const { roomList, filteredRoomList } = this.props;

    if (!roomList || !roomList.length) {
      return this.renderEmpty();
    }

    if (filteredRoomList) {

      return filteredRoomList.map(this.renderRoom.bind(this));
    }

    return roomList && roomList.map(this.renderRoom.bind(this));
  }

  render() {

    return (
      <div className="roomList">
        <RoomsSearch/>
        {this.renderRoomList()}
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RoomList);
