import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError, Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../../redux/constants/index';
import * as actions from '../../../redux/actions/index';
import { RoomComponent, RoomComponentStore } from '../../../services/RoomStoreService';

import './styles.css';

const ROOM_NAME_FIELD = 'room-name';

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  onSubmit: async (values: any) => {
    const roomName = values[ROOM_NAME_FIELD];

    try {
      await dispatch(actions.addRoomThunk(roomName));
    } catch (error) {
      throw new SubmissionError({ _error: error && error.message })
    }
  }
});

class Main extends React.Component<InjectedFormProps> {
  constructor(props: any) {
    super(props);
  }

  // renderLoading() {
  //   return (
  //     <div className="chatWrapper">
  //       <div className="chatLoadingBlock">Opening chat room...</div>
  //     </div>
  //   );
  // }
  //
  // renderError() {
  //   const { chatCreateFailure } = this.state;
  //
  //   return (
  //     <div className="chatWrapper">
  //       <div className="chatError">
  //         <div className="chatErrorTitle">Open chat room error:</div>
  //         <div>{chatCreateFailure}</div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const { handleSubmit, error } = this.props;
    console.log('CREATEROOM', this.props)

    return (
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
          <Field
            name={ROOM_NAME_FIELD}
            type="text"
            className="mainFormInput"
            component="input"
            label="Room name"
            placeholder="Enter room name..."
          />

          <button
            className="mainFormButton"
            type="submit">
            Open chat room
          </button>
          { error && <div className="mainFormError">{error}</div>}
        </form>
      </div>
    );
  }

}

const validate = (values: any) => {
  const errors: any = {};
  if (!values['room-name']) {
    errors['room-name'] = 'Required';
  }
  return errors;
};

const form: any = reduxForm({
  validate,
  form: constants.MAIN_PAGE_FORM,
})(Main);
export default connect(null, mapDispatchToProps)(form);
