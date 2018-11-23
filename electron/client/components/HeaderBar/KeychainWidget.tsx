import * as React from 'react';

const keyIcon = require('../../assets/icons/key_background.svg');
const keyIconActive = require('../../assets/icons/key.svg');

interface KeychainWidgetProps {
  togglePanel(): void;
  isOpen: boolean;
}
export class KeychainWidget extends React.Component<KeychainWidgetProps> {
  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? keyIconActive : keyIcon;
    return (
      <div className="keychain" onClick={() => togglePanel()}>
        <img className="icon" src={icon} />
        <div className="keyname">wallet</div>
      </div>
    );
  }
}
