import * as React from 'react';

interface KeysProps {
  items: string[];
  removeKey: (name: string) => void;
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
      selectedKey: null,
    };
  }

  itemClickHandle(item: string) {
    // this.props.removeKey(item);
    this.setState({selectedKey: item});
  }

  selectedClass(item: string) {
    return item === this.state.selectedKey ? 'selected' : '';
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
