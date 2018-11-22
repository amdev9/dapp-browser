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
  createButtonState: number;
}

export class Keys extends React.Component<KeysProps, KeysState> {
  constructor(props: KeysProps) {
    super(props);
    this.getList = this.getList.bind(this);
    this.itemClickHandle = this.itemClickHandle.bind(this);
    this.state = {
      inputValue: '',
      selectedKey: '',
      createButtonState: 0,
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

  getCreateBigButtonClass() {
    return this.state.createButtonState === 1 ? '' : 'visible';
  }

  getCreateInputClass() {
    return this.state.createButtonState === 1 ? 'visible' : '';
  }

  createButtonToState(stateNumber: number) {
    this.setState({createButtonState: stateNumber});
  }

  private getList(): JSX.Element[] | null {
    const { items } = this.props;

    if (items) {
      return items.map((item) => (
        <div key={`keys_${item}`} className={`item ${this.selectedClass(item)}`} onClick={ () => this.itemClickHandle(item)}>
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

  afterKeyCreated() {
    this.props.createKey(this.state.inputValue);
    this.createButtonToState(0);
  }

  public render() {
    return (
      <div className="group">
        <div className="title">
        </div>
        <div className={`create ${this.getCreateBigButtonClass()}`}>
          <button onClick={ () => this.createButtonToState(1) }>Create Key</button>
        </div>
        <div className={`create ${this.getCreateInputClass()}`}>
          <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} ></input>
          <button onClick={ () => this.afterKeyCreated() }>Create</button>
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
