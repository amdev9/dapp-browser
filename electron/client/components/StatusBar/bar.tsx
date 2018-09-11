import { StatusBarItem } from "../../redux/model"
import * as moment from "moment"
import * as React from "react"

interface StatusBarProps {
  item: StatusBarItem
  visible: boolean
}

// Assets
const indicatorIcon = require("../../assets/icons/indicator.svg");
const peersIcon = require("../../assets/icons/peers.svg");
const clockIcon = require("../../assets/icons/clock.svg");

export class Bar extends React.Component<StatusBarProps> {

  public render() {
    const { item, visible } = this.props;
    const props = {style: {display: visible ? "flex" : "none"}};

    return (
      <div className="bar" {...props}>
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
