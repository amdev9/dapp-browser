import * as React from 'react';
import { slide as Menu, Props as MenuProps } from 'react-burger-menu';
import { Keys } from './Keys';

interface KeychainPanelProps {
  isOpen?: boolean;
  items?: string[];
  togglePanel?(openStatus: boolean): void;
  isLoaderPanelOpen?: boolean;
  toggleLoaderPanel?(openStatus: boolean): void;
}

export class KeychainPanel extends React.Component<KeychainPanelProps> {
  constructor(props: KeychainPanelProps) {
    super(props);
    this.getList = this.getList.bind(this);
  }

  private getList(): JSX.Element[] | JSX.Element {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return (
        <div className="empty">

        </div>
      );
    } else {
      return (
        <Keys
          items={items}
        />
      );
    }
  }

  render() {
    const { isOpen, togglePanel, isLoaderPanelOpen, toggleLoaderPanel } = this.props;

    const menuProps: MenuProps = {
      outerContainerId: 'root-container',
      pageWrapId: 'content-wrap',
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen,
      onStateChange: (value) => {
        if (isOpen && isLoaderPanelOpen) {
          toggleLoaderPanel(false);
        }
        if (isOpen !== value.isOpen) {
          togglePanel(value.isOpen);
        }
      },
    };

    return (
      <Menu {...menuProps}>
        <div className="notifications-popup">
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
