import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import * as constants from '../../redux/constants';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();

import './styles.css';

interface MainState {
  signResult: string;
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: async (values: any) => {
    // console.log('values: ', values);
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
    // const transaction = values['transaction'];
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
              <label>Transaction</label>
              <Field
                name="transaction"
                type="text"
                component="input"
                label="Transaction"
                placeholder="871689d060721b5cec5a010080841e00000000000011130065cd1d0000000000000000"
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
  if (!values['transaction']) {
    errors['transaction'] = 'Required';
  }
  return errors;
};

const form: any = reduxForm({
  validate,
  form: constants.MAIN_PAGE_FORM,
})(Main);
export default connect(null, mapDispatchToProps)(form);
