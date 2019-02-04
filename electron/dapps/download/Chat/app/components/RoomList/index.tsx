import * as React from 'react';
import { connect } from 'react-redux';
import * as cn from 'classnames';

import * as actions from '../../redux/actions';
import * as thunks from '../../redux/thunks';
import { IState } from '../../redux/reducers';
import { Room } from '../../redux/reducers/rooms';
import RoomsSearch from '../RoomsSearch';

import './styles.css';

interface StateProps {
  selectedRoom: string | null;
  roomList: Room[];
  filteredRoomList: Room[] | null;
}

interface DispatchProps {
  selectRoom: (roomId: string) => void;
  roomLeave: (roomId: string) => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
  roomList: state.rooms.roomList,
  filteredRoomList: state.rooms.filteredRoomList,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  selectRoom: (roomId: string) => dispatch(thunks.selectRoom(roomId)),
  roomLeave: (roomId: string) => dispatch(thunks.roomLeaveThunk(roomId)),
});

type Props = StateProps & DispatchProps;

class RoomList extends React.Component<Props> {
  renderEmpty() {
    return (
      <li className="roomListItem list-group-item disabled">
        Room list is empty
      </li>);
  }

  isEmptyRoomList() {
    const { roomList } = this.props;

    return !roomList || !roomList.length;
  }

  renderRoomList() {
    const { roomList, filteredRoomList } = this.props;

    if (this.isEmptyRoomList()) {
      return this.renderEmpty();
    }

    if (filteredRoomList) {

      return filteredRoomList.map(this.renderRoomListItem.bind(this));
    }

    return roomList && roomList.map(this.renderRoomListItem.bind(this));
  }

  renderRoomListItem(room: Room, i: number) {
    const { selectRoom, selectedRoom, roomLeave } = this.props;
    const isSelectedRoom = selectedRoom === room.roomId;

    return (
      <a
        key={i}
        className={cn('roomListItem', 'justify-content-between', 'list-group-item', 'list-group-item-action', { active: isSelectedRoom })}
        onClick={() => selectRoom(room.roomId)}
        href="#"
      >
        {room.roomName}
        {room.unreadMessagesCount ? (
          <span className={cn('badge', 'float-right', isSelectedRoom ? 'badge-light' : 'badge-primary')}>
            {room.unreadMessagesCount}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="rootListClose"
          onClick={(e) => {
            e.stopPropagation();
            roomLeave(room.roomId);
          }}>
            &times;
          </span>
      </a>
    );
  }

  renderFilteredRoomList(filteredRoomList: Room[]) {
    if (!filteredRoomList.length) {
      return this.renderEmpty();
    }

    return filteredRoomList.map(this.renderRoomListItem.bind(this));
  }

  render() {

    return (
      <div className="roomList">
        <RoomsSearch/>
        <div className={cn('list-group', { 'list-group-flush': this.isEmptyRoomList() })}>
          {this.renderRoomList()}
        </div>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RoomList);
