import * as React from 'react';
import { IoMdUnlock } from 'react-icons/io';

interface KeysProps {
  items: string[];
  selectedKey: string;
  removeKey: (name: string) => void;
  unlockKey: (name: string) => void;
  onSelect: (name: string) => void;
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
    // this.props.removeKey(item);
    this.props.onSelect(item);
    this.setState({selectedKey: item});
  }

  selectedClass(item: string) {
    return item === this.props.selectedKey ? 'selected' : '';
  }

  private getList(): JSX.Element[] | null {
    const { items } = this.props;

    if (items) {
      return items.map((item) => (
        <div key={`keys_${item}`} className={`item ${this.selectedClass(item)}`} onClick={ () => this.itemClickHandle(item)}>
          <div className="title">
            <span className="app">{item}</span>
            <IoMdUnlock fontSize="25px" color="#ffffff" className={`lock-status ${this.selectedClass(item)}`} onClick={ () => this.props.unlockKey(item)} />
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
