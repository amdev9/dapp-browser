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
}
const TO_DEFAULT = '0xE8899BA12578d60e4D0683a596EDaCbC85eC18CC';
const AMOUNT_DEFAULT = '100';

export default class Main extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handlePublicKeyClick = this.handlePublicKeyClick.bind(this);
    this.state = {
      result: '',
      toValue: TO_DEFAULT,
      amountValue: AMOUNT_DEFAULT,
      publicKey: '',
    };
  }

  async handleSignClick(e: any) {
    // const result = await keychain.sign(this.state.inputValue);
    console.log('handleSignClick this.state.toValue: ', this.state.toValue);
    const result = await ethereum.buildTransaction(this.state.toValue, parseInt(this.state.amountValue, 10));
    this.setState({result});
  }

  async handlePublicKeyClick(e: any) {
    const publicKey = await keychain.publicKey();
    this.setState({publicKey, result: publicKey});
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
            <span>{ this.state.result }</span>
          </li>
        </ul>
      </div>
    );
  }

}
