import * as React from 'react';
import { connect } from 'react-redux';

import ChatHeader from '../ChatHeader';
import ChatWindow from '../ChatWindow';
import ChatControls from '../ChatControls';

const ArrayIO = require('array-io');

import './styles.css';

interface OwnProps {
}

interface StateProps {
  selectedRoom: string;
}

type Props = StateProps & OwnProps;

const mapStateToProps = (state: any): StateProps => ({
  selectedRoom: state.rooms.selectedRoom,
});

class ChatView extends React.Component<Props> {
  render() {
    const { selectedRoom } = this.props;

    if (!selectedRoom) {
      return 'Room has not selected';
    }

    return (
      <div className="chatWrapper">
        <ChatHeader/>
        <ChatWindow/>
        <ChatControls/>
      </div>
    );
  }
}

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(ChatView);
