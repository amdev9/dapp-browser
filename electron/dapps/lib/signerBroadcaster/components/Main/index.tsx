import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';

import './styles.css';

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: async (values: any) => {
    const roomName = values['room-name'];

    dispatch(actions.onSubmitMainFormThunk(roomName));
    // await dispatch(onSubmitCreateHWAccountPage(walletName));
  },
});

class Main extends React.Component<InjectedFormProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="mainForm">
        <div>Status: connected</div>
        <form onSubmit={handleSubmit}>
          <Field
            name="room-name"
            type="text"
            className="amountInput"
            component="input"
            label="Amount"
            placeholder="Enter amount..."
          />

          <button
            className="mainFormButton"
            type="submit">
            Sign
          </button>
          <button
            className="mainFormButton"
            type="submit">
            Send
          </button>
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
