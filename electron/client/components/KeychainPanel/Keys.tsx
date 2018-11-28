import * as React from 'react';
import { IoMdLock, IoMdUnlock } from 'react-icons/io';

interface KeysProps {
  items: string[];
  selectedKey: string;
  unlockKey: () => void;
  lockKey: () => void;
  onSelect: (name: string) => void;
  unlocked: boolean;
}

interface KeysState {
  selectedKey: string;
}

export class Keys extends React.Component<KeysProps, KeysState> {
  constructor(props: KeysProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.itemClickHandle = this.itemClickHandle.bind(this);
    this.state = {
      selectedKey: '',
    };
  }

  itemClickHandle(item: string) {
    this.props.onSelect(item);
    this.setState({selectedKey: item});
  }

  selectedClass(item: string) {
    const classes = [
      item === this.props.selectedKey ? 'selected' : '',
      this.props.unlocked ? 'unlocked' : '',
    ];
    return classes.join(' ');
  }

  private getList(): JSX.Element[] | null {
    const { items } = this.props;

    if (items) {
      return items.map((item) => (
        <div key={`keys_${item}`} className={`item ${this.selectedClass(item)}`} onClick={ () => this.itemClickHandle(item)}>
          <div className="title">
            <span className="app">{item}</span>
            <IoMdLock fontSize="25px" color="#ffffff" className={`lock-status ${this.selectedClass(item)} lock`} onClick={ () => this.props.lockKey()} />
            <IoMdUnlock fontSize="25px" color="#ffffff" className={`lock-status ${this.selectedClass(item)} unlock`} onClick={ () => this.props.unlockKey()} />
          </div>
        </div>
      ));
    } else {
      return null;
    }
  }

  public render() {
    return (
      <div className="group">
        <div className="title">
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    );
  }
}
