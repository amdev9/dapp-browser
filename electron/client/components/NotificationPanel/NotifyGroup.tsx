import { bindActionCreators, Dispatch } from "redux"
//import { clearGroup } from "../../redux/actions/notification";
import { Notify as Item } from "./Notify"
//import { RootState } from "app/reducers"
import { NotifyItem } from "../../redux/model";
//import { connect } from "react-redux"
import { Ionicon } from "react-ionicons"
import { Notify } from "./Notify"
import * as moment from "moment"
import * as React from "react"

namespace NotifyGroup {
  export interface Props {
    clearNotification?: (notifyId: number) => void,
    clearAllNotifications?: () => void,
    items: NotifyItem[]
  }

  export interface State {

  }

  export interface RefMap {
    [index: string]: React.RefObject<Notify>
  }
}

export class NotifyGroup extends React.Component<NotifyGroup.Props, NotifyGroup.State> {
  private refItems: NotifyGroup.RefMap = {}

  constructor(props: NotifyGroup.Props) {
    super(props)

    props.items.forEach(((item, index) => {
      this.refItems[index] = React.createRef()
    }))

    this.getList = this.getList.bind(this)
    this.clearIt = this.clearIt.bind(this)
  }

  public state: NotifyGroup.State = {

  }

  private async clearIt() {
    const { clearAllNotifications, items } = this.props
    /*const stepDelay = 150
    let totalDelay = 0

    for (let index = (items.length - 1); index > -1; index--) {
      const itemRef = this.refItems[index]

      if (itemRef.current) {
        //itemRef.current.hide(totalDelay)
        totalDelay += stepDelay
      }
    }*/

    //await Promise.delay(totalDelay + stepDelay)

    if (clearAllNotifications()) {
      clearAllNotifications();
    }
  }

  private getList(): JSX.Element[] | null {
    const { items, clearNotification } = this.props

    if (items) {
      return items.map((item, index) => (
        <Item
          key={item.id}
          ref={this.refItems[index]}
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
