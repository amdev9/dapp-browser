import * as React from 'react';

const keyIcon = require('../../assets/icons/key.svg');

interface KeychainWidgetProps {
  isOpen?: boolean;
  togglePanel?(): void;
}
export class KeychainWidget extends React.Component<KeychainWidgetProps> {
  public render() {
    const { togglePanel } = this.props;
    return (
      <div className="keychain" onClick={() => togglePanel()}>
        <img className="icon" src={keyIcon} />
        <div className="keyname">wallet</div>
      </div>
    );
  }
}
