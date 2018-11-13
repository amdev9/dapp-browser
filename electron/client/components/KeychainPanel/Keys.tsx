import * as React from 'react';

interface KeysProps {
  items: string[];
  removeKey: (name: string) => void;
}

export class Keys extends React.Component<KeysProps> {
  constructor(props: KeysProps) {
    super(props);
    this.getList = this.getList.bind(this);
  }

  private getList(): JSX.Element[] | null {
    const { items } = this.props;

    if (items) {
      return items.map((item) => (
        <div className="item" onClick={ () => this.props.removeKey(item)}>
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
