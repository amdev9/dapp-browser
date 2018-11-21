import * as React from 'react';
import { connect } from 'react-redux';

import { getSelectedRoomNameSelector } from '../../../redux/selectors';
import * as actions from '../../../redux/actions';

interface StateProps {
  selectedRoomName: string;
}

interface DispatchProps {
  deselectRoom: () => void;
}

const mapStateToProps = (state: any): StateProps => ({
  selectedRoomName: getSelectedRoomNameSelector(state),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  deselectRoom: () => dispatch(actions.deselectRoom()),
});

type Props = StateProps & DispatchProps;

class ChatHeader extends React.Component<Props> {
  render() {
    return (
      <div className="chatNavigation">
        <h1>
          {this.props.selectedRoomName}
          <button
            className="roomLeftButton"
            onClick={() => this.props.deselectRoom()}>
            Leave room
          </button>
        </h1>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ChatHeader);
