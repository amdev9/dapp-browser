import * as React from 'react';

interface KeysProps {
  items: string[];
  selectedKey: string;
  removeKey: (name: string) => void;
  onSelect: (name: string) => void;
}

export class Keys extends React.Component<KeysProps> {
  constructor(props: KeysProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.itemClickHandle = this.itemClickHandle.bind(this);
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
        <div className={`item ${this.selectedClass(item)}`} onClick={ () => this.itemClickHandle(item)}>
          <div className="title">
            <span className="app">{item}</span>
          </div>
        </div>
      ));
    } else {
      return null;
    }
  }

  public render() {
    const groupTimeLabel = '';
    return (
      <div className="group">
        <div className="title">
          <span>{groupTimeLabel}</span>
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    );
  }
}
