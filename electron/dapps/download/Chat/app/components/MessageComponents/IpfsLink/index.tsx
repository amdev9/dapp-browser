import * as React from 'react';

const DappIO = require('dapp-io');

import './styles.css';

interface IProps {
  filename: string;
  hash: string;
}

interface IState {
  showProgress: boolean;
}

export default class Index extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showProgress: false,
    };
  }

  async onClick(e: any) {
    const { hash } = this.props;
    e.preventDefault();

    try {
      this.setState({ showProgress: true });
      await DappIO.IpfsStorage.downloadIpfsFile(hash);
    } catch (error) {
      console.log('Download error', error);
    }
    this.setState({ showProgress: false });
  }

  renderProgress() {
    return (
      <span className="ipfs-downloading-spinner"/>
    );
  }

  render() {
    const { hash, filename } = this.props;

    if (!hash) {
      return null;
    }

    return (
      <div
        onClick={this.onClick.bind(this)}
        className="ipfs-link">
        {filename}
        <br/>
        {hash}
        {this.state.showProgress ? this.renderProgress() : null}
      </div>
    );
  }
}
