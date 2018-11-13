import { KeychainMenu } from './menu';
import Dropdown, { DropdownProps } from 'rc-dropdown';
import * as React from 'react';

// Assets
const keyIcon = require('../../../assets/icons/key.svg');

export interface KeychainProps {

}

export interface KeychainState {
  isOpen: boolean;
}

export class Keychain extends React.Component<KeychainProps, KeychainState> {
  constructor(props: KeychainProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  public state: KeychainState = {
    isOpen: false,
  };

  private toggle(status: boolean) {
    // const { isOpen } = this.state

    // Toggle And clear
    this.setState({
      isOpen: status,
    });
  }

  public render() {
    const { isOpen } = this.state;

    const props: DropdownProps = {
      prefixCls: 'keychain-tooltip',
      overlay: <KeychainMenu />,
      placement: 'bottomRight',
      trigger: ['click'],
      visible: isOpen,

      onVisibleChange: (visible: boolean) => {
        this.setState({ isOpen: visible });
      },
    };

    return (
      <Dropdown {...props}>
        <div className="keychain">
          <img className="icon" src={keyIcon} />
          <div className="keyname">wallet</div>
        </div>
      </Dropdown>
    );
  }
}
