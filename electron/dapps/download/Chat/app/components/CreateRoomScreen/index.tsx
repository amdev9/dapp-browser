import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError, Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';

import './styles.css';

const ROOM_NAME_FIELD = 'room-name';

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  onSubmit: async (values: any) => {
    const roomName = values[ROOM_NAME_FIELD];

    try {
      await dispatch(actions.addRoomThunk(roomName));
    } catch (error) {
      throw new SubmissionError({ _error: error && error.message });
    }
  },
});

class CreateRoomScreen extends React.Component<InjectedFormProps> {
  renderLoading() {
    return (<div className="createRoomLoading">Opening chat room...</div>);
  }

  renderError() {
    const { error } = this.props;

    return (<div className="createRoomError">{error}</div>);
  }

  render() {
    const { handleSubmit, error, submitting } = this.props;

    return (
      <div className="createRoom">
        <form onSubmit={handleSubmit}>
          <Field
            name={ROOM_NAME_FIELD}
            type="text"
            className="createRoomInput"
            component="input"
            label="Room name"
            placeholder="Enter room name..."
          />

          <button
            className="createRoomButton"
            type="submit">
            Open chat room
          </button>
          {error && this.renderError()}
          {submitting && this.renderLoading()}
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
})(CreateRoomScreen);
export default connect(null, mapDispatchToProps)(form);
