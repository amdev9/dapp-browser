import * as React from 'react';
import { slide as Menu, Props as MenuProps } from 'react-burger-menu';
import { Keys } from './Keys';

interface KeychainPanelProps {
  isOpen: boolean;
  items: string[];
  selectedKey: string;
  togglePanel(): void;
  createKey(name: string): void;
  removeKey(name: string): void;
  signKey(name: string): void;
  listKeys(): void;
  selectKey(name: string): void;
}

export class KeychainPanel extends React.Component<KeychainPanelProps> {
  constructor(props: KeychainPanelProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.onKeySelect = this.onKeySelect.bind(this);
  }

  onKeySelect(key: string) {
    this.props.selectKey(key);
  }

  private getList(): JSX.Element[] | JSX.Element {
    const { items, selectedKey } = this.props;

    if (!items || items.length === 0) {
      return (
        <div className="empty">
        </div>
      );
    } else {
      return (
        <Keys
          items={items}
          selectedKey={selectedKey}
          createKey={this.props.createKey}
          removeKey={this.props.removeKey}
          onSelect={this.onKeySelect}
        />
      );
    }
  }

  render() {
    const { isOpen, togglePanel } = this.props;

    const menuProps: MenuProps = {
      outerContainerId: 'root-container',
      pageWrapId: 'content-wrap',
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen,
      onStateChange: (value) => {
        if (isOpen !== value.isOpen) {
          togglePanel();
        }
      },
    };

    return (
      <Menu {...menuProps}>
        <div className="keychain-popup">
          <div className="header">
            <h4>Wallet</h4>
          </div>
          <div className="groups">
            {this.getList()}
          </div>
        </div>
      </Menu>
    );
  }
}
