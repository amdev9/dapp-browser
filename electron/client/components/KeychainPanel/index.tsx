import * as React from 'react';
import { slide as Menu, Props as MenuProps } from 'react-burger-menu';
import { Keys } from './Keys';

interface KeychainPanelProps {
  isOpen?: boolean;
  items?: string[];
  togglePanel?(openStatus: boolean): void;
  createKey(name: string): void;
  removeKey(name: string): void;
  listKeys(): void;
  isLoaderPanelOpen?: boolean;
  toggleLoaderPanel?(openStatus: boolean): void;
}

interface KeychainPanelState {
  inputValue: string;
}

export class KeychainPanel extends React.Component<KeychainPanelProps, KeychainPanelState> {
  constructor(props: KeychainPanelProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.state = {
      inputValue: '',
    };
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
          removeKey={this.props.removeKey}
        />
      );
    }
  }

  updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: evt.target.value
    });
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
          <div>
            <input value={this.state.inputValue} style={{ margin: '10px' }} onChange={evt => this.updateInputValue(evt)} ></input>
            <button onClick={ () => this.props.createKey(this.state.inputValue) }>Create</button>
            <button onClick={ () => this.props.listKeys() }>List</button>
          </div>
        </div>
      </Menu>
    );
  }
}
