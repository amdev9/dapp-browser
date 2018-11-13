import * as React from 'react';

export interface KeychainMenuProps {

}

export interface KeychainMenuState {

}

export class KeychainMenu extends React.Component<KeychainMenuProps, KeychainMenuState> {
  constructor(props: KeychainMenuProps) {
    super(props);
  }

  public state: KeychainMenuState = {

  };

  public render() {
    return (
      <div className="keychain-menu">
        <ul>
          <li>NATHAN</li>
          <li>TEST0</li>
          <li>TTT</li>
          <li>TEST1</li>
          <li>Create New</li>
        </ul>
      </div>
    );
  }
}
