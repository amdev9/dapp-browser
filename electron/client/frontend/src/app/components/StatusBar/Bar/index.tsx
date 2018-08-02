import { StatusBarItem } from "app/models"
import * as moment from "moment"
import * as React from "react"

export namespace Bar {
  export interface Props {
    item: StatusBarItem
  }

  export interface State {

  }
}

// Assets
const indicatorIcon = require("../../../../assets/icons/indicator.svg")
const peersIcon = require("../../../../assets/icons/peers.svg")
const clockIcon = require("../../../../assets/icons/clock.svg")

export class Bar extends React.Component<Bar.Props, Bar.State> {
  constructor(props: Bar.Props) {
    super(props)
  }

  public state: Bar.State = {

  }

  public render() {
    const { item } = this.props

    return (
      <div className="bar">
        <div className="info">
          <div className="title">
            <div className="name">{item.name}</div>
            <div className="status"></div>
          </div>
          <div className="nodes">
            <div className="icon">
              <img src={indicatorIcon} />
            </div>
            <div className="count">
              {item.nodes}
            </div>
            <div className="separator">/</div>
            <div className="total">
              {item.nodesTotal}
            </div>
          </div>
          <div className="peers">
            <div className="icon">
              <img src={peersIcon} />
            </div>
            <div className="count">
              {item.peers} peers
            </div>
          </div>
          <div className="times">
            <div className="icon">
              <img src={clockIcon} />
            </div>
            <div className="count">
              {moment.duration(item.time).humanize()}
            </div>
            <div className="separator">/</div>
            <div className="total">
              {moment.duration(item.timeTotal).humanize()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
