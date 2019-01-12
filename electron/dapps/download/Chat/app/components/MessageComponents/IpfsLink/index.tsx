import * as React from 'react';

const ArrayIO = require('array-io');

import './styles.css';

interface IProps {
  filename: string;
  hash: string;
}

export default class Index extends React.Component<IProps> {
  onClick(e) {
    const { hash } = this.props;
    e.preventDefault();

    try {
      ArrayIO.IpfsStorage.downloadIpfsFile(hash);
    } catch (error) {
      console.log('Download error', error);
    }
  }

  render() {
    const { hash, filename } = this.props;

    console.log('props ipfslink', this.props)
    if (!hash) {
      return null;
    }

    return (
      <div
        onClick={this.onClick.bind(this)}
        className="ipfs-link">
        { filename }
        <br/>
        { hash }
      </div>
    );
  }
}
