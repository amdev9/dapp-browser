import * as React from 'react';
import { connect } from "react-redux";
import * as cn from 'classnames';

import { RoomComponent } from '../../services/RoomStoreService';
import * as actions from "../../redux/actions/index";
import { IState } from "../../redux/reducers/index";
import { Room } from "../../redux/reducers/rooms";
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
  selectRoom: (roomId: string) => dispatch(actions.selectRoom(roomId)),
  roomRemove: (roomId: string) => dispatch(actions.roomRemoveThunk(roomId)),
});

type Props = StateProps & DispatchProps;

class RoomList extends React.Component<Props> {
  renderRoom(room: Room, i: number) {
    const { selectRoom, selectedRoom, roomRemove } = this.props;
    const isSelectedRoom = selectedRoom === room.roomId;

    return (
      <div
        key={i}
        className={cn('roomListItem', { roomListItem_active: isSelectedRoom })}
        onClick={() => selectRoom(room.roomId)}
      >
        {room.roomName}
        <div
          className="roomListRoomDelete"
          onClick={(e) => {
            e.stopPropagation();
            roomRemove(room.roomId);
          }}
        >X
        </div>
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

    console.log('roomlist', roomList);
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
