import * as React from 'react';
const DappIO = require('dapp-io');
const keychain: DappIO.Keychain = new DappIO.Keychain();
const ethereum: DappIO.Ethereum = new DappIO.Ethereum();
const logger: DappIO.Logger = new DappIO.Logger();

interface MainState {
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
        <div className="form-group">
          <label htmlFor="toAddressInput">To address</label>
          <input
            type="text"
            className="form-control"
            id="toAddressInput"
            defaultValue={TO_DEFAULT}
            onChange={evt => this.updateTo(evt)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amountInput">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amountInput"
            defaultValue={AMOUNT_DEFAULT}
            placeholder={AMOUNT_DEFAULT}
            onChange={evt => this.updateAmount(evt)}
          />
        </div>

        <button className="btn btn-primary mr-1" onClick={this.handleSignClick}>Sign</button>
        <button className="btn btn-primary" onClick={this.handlePublishClick}>Publish</button>

        <div className="form-group mt-4">
          <label htmlFor="transactionToSignInput">Transaction to Sign</label>
          <input
            type="text"
            className="form-control"
            id="transactionToSignInput"
            value={this.state.transactionToSign}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="etherscanLinkInput">Etherscan link</label>
          <input
            type="text"
            className="form-control"
            id="etherscanLinkInput"
            value={this.state.linkText}
            readOnly
          />
        </div>
      </div>
    );
  }

}
