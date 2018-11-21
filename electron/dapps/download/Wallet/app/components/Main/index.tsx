import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();

import './styles.css';

interface MainState {
  signResult: string;
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: async (values: any) => {
    // console.log('sign result: ', result);
    // dispatch(actions.onSubmitMainFormThunk(amount));
  },
});

class Main extends React.Component<InjectedFormProps, MainState> {
  constructor(props: any) {
    super(props);
    this.handleSign = this.handleSign.bind(this);
    this.state = {
      signResult: '',
    };
  }

  async handleSign(e: any) {
    e.preventDefault();
    // const amount = values['amount'];
    const result = await keychain.sign();
    this.setState({signResult: result});
  }

  render() {
    // const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form>
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
              <button type="submit" onClick={this.handleSign}>Sign</button>
              <span>{ this.state.signResult }</span>
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
