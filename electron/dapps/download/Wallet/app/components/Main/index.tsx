import * as React from 'react';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();
const ethereum: ArrayIO.Ethereum = new ArrayIO.Ethereum();

import './styles.css';

interface MainState {
  result: string;
  inputValue: string;
  publicKey: string;
}

export default class Main extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handlePublicKeyClick = this.handlePublicKeyClick.bind(this);
    this.state = {
      result: '',
      inputValue: '',
      publicKey: '',
    };
  }

  async handleSignClick(e: any) {
    // const result = await keychain.sign(this.state.inputValue);
    const result = await ethereum.buildTransaction(this.state.inputValue, 100);
    console.log('handleSignClick result: ', result);
    this.setState({result});
  }

  async handlePublicKeyClick(e: any) {
    const publicKey = await keychain.publicKey();
    this.setState({publicKey, result: publicKey});
  }

  updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: evt.target.value,
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
              value="0xE8899BA12578d60e4D0683a596EDaCbC85eC18CC"
              placeholder="0xE8899BA12578d60e4D0683a596EDaCbC85eC18CC"
              onChange={evt => this.updateInputValue(evt)}
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
