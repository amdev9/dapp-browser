import { StatusBarItem } from "../../redux/model"
import * as React from "react"
import { Bar } from "./bar"

interface StatusBarProps {
  items?: { [index: string]: StatusBarItem; },
  isOpen?: boolean
}

export class StatusBar extends React.Component<StatusBarProps> {
  constructor(props: StatusBarProps) {
    super(props);

    this.getList = this.getList.bind(this)
  }

  public getList(): JSX.Element[] {
    const { items } = this.props;

    if (items) {
      return Object.keys(items).map((itemKey, index) => (
        <Bar
          key={`${itemKey}-${index}`}
          item={items[itemKey]}
        />
      ))
    } else {
      // @todo replace next
      return [

      ]
    }
  }

  public render() {
    let { isOpen } = this.props;

    const props: any = {
      className: "statusbar",
      style: {
        position: "absolute",
        bottom: 0,
        display: isOpen ? "block": "none"
      },
    };

    return (
      <div {...props}>
        {this.getList()}
        <div className="console"></div>
      </div>
    )
  }
}
