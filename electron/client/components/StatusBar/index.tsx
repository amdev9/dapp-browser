import { StatusBarItem } from "../../redux/model"
import * as React from "react"
import { Bar } from "./bar"

interface StatusBarProps {
  items?: { [index: string]: StatusBarItem; },
  isOpen?: boolean,
  toggleStatusBar?: () => void
}

export class StatusBar extends React.Component<StatusBarProps> {
  constructor(props: StatusBarProps) {
    super(props);

    this.getList = this.getList.bind(this)
  }

  public getList(): JSX.Element[] {
    const { items, isOpen, toggleStatusBar } = this.props;

    if (items) {
      return Object.keys(items)
        .filter((key, index) => index !== 0) // don't take first element as it always visible
        .map((itemKey, index) => (
        <Bar
          key={`${itemKey}-${index}`}
          item={items[itemKey]}
          visible={isOpen}
          toggleStatusBar={toggleStatusBar}
        />
      ))
    } else {
      // @todo replace next
      return [

      ]
    }
  }

  public render() {
    let { isOpen, items, toggleStatusBar } = this.props;

    const props: any = {
      style: {
        display: isOpen ? "block": "none"
      },
    };

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
        <div className="console" {...props} />
      </div>
    )
  }
}
