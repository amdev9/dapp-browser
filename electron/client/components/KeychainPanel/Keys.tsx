import * as React from 'react';

interface KeysProps {
  items: string[];
  selectedKey: string;
  removeKey: (name: string) => void;
  onSelect: (name: string) => void;
  createKey(name: string): void;
}

interface KeysState {
  inputValue: string;
  selectedKey: string;
}

export class Keys extends React.Component<KeysProps, KeysState> {
  constructor(props: KeysProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.itemClickHandle = this.itemClickHandle.bind(this);
    this.state = {
      inputValue: '',
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

  updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  public render() {
    return (
      <div className="group">
        <div className="title">
        </div>
        <div className="create">
          <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} ></input>
          <button onClick={ () => this.props.createKey(this.state.inputValue) }>Create</button>
        </div>
        <div className="title">
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    );
  }
}
