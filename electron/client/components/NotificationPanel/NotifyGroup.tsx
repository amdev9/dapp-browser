import { Notify as Item } from "./Notify"
import { NotifyItem } from "../../redux/model";
// import { Ionicon } from "react-ionicons"
import * as React from "react"

namespace NotifyGroup {
  export interface Props {
    clearNotification?: (id: number) => void,
    clearAllNotifications?: () => void,
    items: NotifyItem[]
  }
}

export class NotifyGroup extends React.Component<NotifyGroup.Props> {
  constructor(props: NotifyGroup.Props) {
    super(props)

    this.getList = this.getList.bind(this)
    this.clearIt = this.clearIt.bind(this)
  }

  private async clearIt() {
    const { clearAllNotifications } = this.props

    if (clearAllNotifications()) {
      clearAllNotifications();
    }
  }

  private getList(): JSX.Element[] | null {
    const { items, clearNotification } = this.props

    if (items) {
      return items.map((item) => (
        <Item
          key={item.id}
          item={item}
          clearNotification={clearNotification}
        />
      ))
    } else {
      return null
    }
  }

  public render() {
    const groupTimeLabel = "";

    const closeStyle = { // haven't managed to use ionicons here. Getting error of wrong export of Ionicon class
      color: "#A8B2BD",
      fontSize: "14px",
    }

    return (
      <div className="group">
        <div className="title">
          <span>{groupTimeLabel}</span>
          <div className="clear" onClick={this.clearIt}>
            <div style={closeStyle}>&#10005;</div>
          </div>
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    )
  }
}
