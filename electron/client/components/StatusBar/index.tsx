import { StatusBarItem } from '../../redux/model';
import * as React from 'react';
import { Bar } from './bar';
import { Logger } from '../../Logger';

interface StatusBarProps {
  items?: { [index: string]: StatusBarItem; };
  isOpen?: boolean;
  toggleStatusBar?: () => void;
  loggerWrite?: boolean;
  peersBarIsOpen?: boolean;
}

export class StatusBar extends React.Component<StatusBarProps> {
  constructor(props: StatusBarProps) {
    super(props);

    this.getList = this.getList.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  public getList(): JSX.Element[] {
    const { items, peersBarIsOpen, toggleStatusBar } = this.props;
    if (items) {
      return Object.keys(items)
        .filter((key, index) => index !== 0) // don't take first element as it always visible
        .map((itemKey, index) => (
        <Bar
          key={`${itemKey}-${index}`}
          item={items[itemKey]}
          visible={peersBarIsOpen}
          toggleStatusBar={toggleStatusBar}
        />
      ))
    }
    return [];
  }

  public getMessages(): JSX.Element[] {
    return Logger.messages.map((itemKey, index) => <div key={`${itemKey}-${index}`}>{itemKey}</div>);
  }

  public render() {
    const { isOpen, items, toggleStatusBar } = this.props;

    const props: any = {
      style: {
        display: isOpen ? 'block' : 'none',
      },
    };

    if (items) {
      const keys = Object.keys(items);

      return (
        <div className="statusbar">
          <Bar
            key={`${keys[0]}-${0}`}
            item={items[keys[0]]}
            visible={true}
            toggleStatusBar={toggleStatusBar}
          />
          {this.getList()}
          <div className="console" {...props} >
            {this.getMessages()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="statusbar">
          <div className="console" {...props} >
            {this.getMessages()}
          </div>
        </div>
      );
    }
  }
}
