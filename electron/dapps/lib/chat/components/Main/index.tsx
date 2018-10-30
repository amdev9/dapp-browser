import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Chat } from '../../../index';
import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: async (values: any) => {
    const roomName = values.get('room-name');

    dispatch(actions.onSubmitMainFormThunk(roomName));
    // await dispatch(onSubmitCreateHWAccountPage(walletName));
  }
});

class Index extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="room-name"
            type="text"
            component="input"
            label="Room name"
          />

          <button type="submit">Open chat room</button>
        </form>
      </div>
    );
  }

}

const form: any = connect(null, mapDispatchToProps)(Index);
export default reduxForm({ form: constants.MAIN_PAGE_FORM })(form);
