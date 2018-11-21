import * as React from 'react';
import { connect } from 'react-redux';

import { getSelectedRoomNameSelector } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import * as thunks from '../../redux/thunks';
import { IState } from '../../redux/reducers';

import './styles.css';

interface StateProps {
  selectedRoomName: string;
}

interface DispatchProps {
  deselectRoom: () => void;
  leaveRoom: () => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  selectedRoomName: getSelectedRoomNameSelector(state),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  deselectRoom: () => dispatch(actions.deselectRoom()),
  leaveRoom: () => dispatch(thunks.removeSelectedRoomThunk()),
});

type Props = StateProps & DispatchProps;

class ChatHeader extends React.Component<Props> {
  render() {
    return (
      <div className="chatHeader">
        <h1 className="chatHeaderText">{this.props.selectedRoomName}</h1>
        <div className="chatHeaderButtonWrapper">
          <button
            className="chatHeaderButton chatHeaderButton_openButton"
            onClick={() => this.props.deselectRoom()}>
            Open new room
          </button>
          <button
            className="chatHeaderButton chatHeaderButton_closeButton"
            onClick={() => this.props.leaveRoom()}>
            Leave room
          </button>
        </div>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ChatHeader);
