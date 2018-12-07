import * as React from 'react';
const ArrayIO = require('array-io');
const keychain: ArrayIO.Keychain = new ArrayIO.Keychain();
const ethereum: ArrayIO.Ethereum = new ArrayIO.Ethereum();
const logger: ArrayIO.Logger = new ArrayIO.Logger();

import './styles.css';

interface MainState {
  result: string;
  to: string;
  amount: string;
  transactionToSign: string;
  linkText: string;
}
const TO_DEFAULT = '0xE8899BA12578d60e4D0683a596EDaCbC85eC18CC';
const AMOUNT_DEFAULT = '100';

export default class Main extends React.Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.state = {
      result: '',
      to: TO_DEFAULT,
      amount: AMOUNT_DEFAULT,
      transactionToSign: 'Please, sign your transaction',
      linkText: 'Please, publish your transaction',
    };
  }

  async handleSignClick(e: any) {
    const publicKey = await keychain.publicKey();
    console.log('publicKey: ', publicKey);  // todo substitute console.log() on the Client's Console log
    logger.write(`publicKey: ${publicKey}`);

    const from = await ethereum.publicToAddress(`0x${publicKey}`);
    logger.write(`from address: ${from}`);

    const rawTransaction = await ethereum.buildTransaction('', from, this.state.to, parseInt(this.state.amount, 10));
    logger.write(`rawTransaction: ${rawTransaction}`);

    const signature = await keychain.sign(rawTransaction);
    logger.write(`signature: ${signature}`);

    const transactionToSign = await ethereum.buildTransaction(signature, from, this.state.to, parseInt(this.state.amount, 10));
    logger.write(`transactionToSign: ${transactionToSign}`);

    this.setState({transactionToSign});
  }

  async handlePublishClick(e: any) {
    const result = await ethereum.publishTransaction(this.state.transactionToSign);
    this.setState({
      linkText: `https://ropsten.etherscan.io/tx/${result}`,
    });
  }

  updateTo(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      to: evt.target.value,
    });
  }

  updateAmount(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      amount: evt.target.value,
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
              onChange={evt => this.updateTo(evt)}
            />
          </li>
          <li>
            <label>Amount</label>
            <input
              type="number"
              defaultValue={AMOUNT_DEFAULT}
              placeholder={AMOUNT_DEFAULT}
              onChange={evt => this.updateAmount(evt)}
            />
          </li>
          <li>
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
