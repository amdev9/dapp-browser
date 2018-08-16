import { NotifyItem } from "../../redux/model";
import * as moment from "moment"
import * as React from "react"

export namespace Notify {
  export interface Props {
    item: NotifyItem
  }

  export interface State {
    hidden: boolean
  }
}

export class Notify extends React.Component<Notify.Props, Notify.State> {
  constructor(props: Notify.Props) {
    super(props)

    //this.hide = this.hide.bind(this)
  }

  public state: Notify.State = {
    hidden: false,
  }

  /*public async hide(delay: number) {
    await Promise.delay(delay)
    this.setState({ hidden: true })
  }*/

  public render() {
    const { hidden } = this.state
    const { item } = this.props
    const created = moment(item.created)

    const hiddenClass = hidden ? "hide-notify" : ""

    const timeLabel = created.isSame(moment(), "day")
      ? created.fromNow()
      : created.format("DD.MM.YY")

    return (
      <div className={`item ${hiddenClass}`}>
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
