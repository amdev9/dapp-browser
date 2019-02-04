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
        <h4 className="chatHeaderText">{this.props.selectedRoomName}</h4>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ChatHeader);
