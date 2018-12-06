import * as React from 'react';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();
const ethereum: ArrayIO.Ethereum = new ArrayIO.Ethereum();

import './styles.css';

interface MainState {
  result: string;
  toValue: string;
  publicKey: string;
  amountValue: string;
  transactionToSign: string;
  linkText: string;
}
const TO_DEFAULT = '0xE8899BA12578d60e4D0683a596EDaCbC85eC18CC';
const AMOUNT_DEFAULT = '100';

export default class Main extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handlePublicKeyClick = this.handlePublicKeyClick.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.state = {
      result: '',
      toValue: TO_DEFAULT,
      amountValue: AMOUNT_DEFAULT,
      transactionToSign: 'Please, sign your transaction',
      publicKey: '',
      linkText: 'Please, publish your transaction',
    };
  }

  async handleSignClick(e: any) {
    const transactionToSign = await ethereum.buildTransaction(this.state.toValue, parseInt(this.state.amountValue, 10));
    this.setState({transactionToSign});
  }

  async handlePublicKeyClick(e: any) {
    const publicKey = await keychain.publicKey();
    this.setState({publicKey, result: publicKey});
  }

  async handlePublishClick(e: any) {
    const result = await ethereum.publishTransaction(this.state.transactionToSign);
    this.setState({
      linkText: `https://ropsten.etherscan.io/tx/${result}`,
    });
  }

  updateToValue(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      toValue: evt.target.value,
    });
  }

  updateAmountValue(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      amountValue: evt.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <ul className="flex-outer">
          <li>
            <label>To address</label>
            <input
              type="text"
              defaultValue={TO_DEFAULT}
              onChange={evt => this.updateToValue(evt)}
            />
          </li>
          <li>
            <label>Amount</label>
            <input
              type="number"
              defaultValue={AMOUNT_DEFAULT}
              placeholder={AMOUNT_DEFAULT}
              onChange={evt => this.updateAmountValue(evt)}
            />
          </li>
          <li>
            <button onClick={this.handlePublicKeyClick}>Public key</button>
            <button onClick={this.handleSignClick}>Sign</button>
            <button onClick={this.handlePublishClick}>Publish</button>
            <span>{ this.state.result }</span>
          </li>
          <li>Transaction to Sign:&nbsp;<i>{this.state.transactionToSign}</i></li>
          <li>Etherscan link:&nbsp;<i>{this.state.linkText}</i></li>
        </ul>
      </div>
    );
  }

}
