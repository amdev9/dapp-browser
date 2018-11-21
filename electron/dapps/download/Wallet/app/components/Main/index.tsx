import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();

import './styles.css';

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: async (values: any) => {
    const amount = values['amount'];
    const result = await keychain.sign();
    console.log('sign result: ', result);
    // dispatch(actions.onSubmitMainFormThunk(amount));
  },
});

class Main extends React.Component<InjectedFormProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <ul className="flex-outer">
            <li>
              <label>Amount</label>
              <Field
                name="amount"
                type="text"
                className="mainFormAmountInput"
                component="input"
                label="Amount"
                placeholder="Enter amount..."
              />
            </li>
            <li>
              <button type="submit">Send</button>
              <button id="keychainSignButton" type="submit">Sign</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }

}

const validate = (values: any) => {
  const errors: any = {};
  if (!values['amount']) {
    errors['amount'] = 'Required';
  }
  return errors;
};

const form: any = reduxForm({
  validate,
  form: constants.MAIN_PAGE_FORM,
})(Main);
export default connect(null, mapDispatchToProps)(form);
