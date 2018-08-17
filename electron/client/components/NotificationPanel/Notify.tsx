import { NotifyItem } from "../../redux/model";
import * as moment from "moment"
import * as React from "react"

namespace Notify {
  export interface Props {
    item: NotifyItem,
    clearNotification?: (id: number) => void,
  }
}

export class Notify extends React.Component<Notify.Props> {
  constructor(props: Notify.Props) {
    super(props)

    this.hide = this.hide.bind(this)
  }

  private async hide() {
    this.props.clearNotification(this.props.item.id);
  }

  public render() {
    const { item } = this.props
    const created = moment(item.created)

    const timeLabel = created.isSame(moment(), "day")
      ? created.fromNow()
      : created.format("DD.MM.YY")

    return (
      <div className="item" onClick={this.hide}>
        <div className="title">
          <img src={item.icon} />
          <span className="app">{item.appName}</span>
          <span className="time">{timeLabel}</span>
        </div>
        <div className="content">
          {item.message}
        </div>
      </div>
    )
  }
}
