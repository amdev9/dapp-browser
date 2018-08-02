import { bindActionCreators, Dispatch } from "redux"
import { NotificationsActions } from "app/actions"
import { RootState } from "app/reducers"
import { NotifyItem } from "app/models"
import { connect } from "react-redux"
import Ionicon from "react-ionicons"
import * as moment from "moment"
import * as React from "react"
import { Notify } from "./NotifyItem"

export namespace NotifyGroup {
  export interface Props {
    clearGroup?: (groudId: string) => Promise<void>,
    items: NotifyItem[]
    groupId: string
  }

  export interface State {

  }

  export interface RefMap {
    [index: string]: React.RefObject<Notify>
  }
}

const mapStateToProps = (state: RootState): {} => ({})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  clearGroup: NotificationsActions.clearGroup,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
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
    const { clearGroup, groupId, items } = this.props
    const stepDelay = 150
    let totalDelay = 0

    for (let index = (items.length - 1); index > -1; index--) {
      const itemRef = this.refItems[index]

      if (itemRef.current) {
        itemRef.current.hide(totalDelay)
        totalDelay += stepDelay
      }
    }

    await Promise.delay(totalDelay + stepDelay)

    if (clearGroup) {
      clearGroup(groupId)
    }
  }

  private getList(): JSX.Element[] | null {
    const { items } = this.props

    if (items) {
      return items.map((item, index) => (
        <Notify
          key={`${index}-${item.created.getTime()}`}
          ref={this.refItems[index]}
          item={item}
        />
      ))
    } else {
      return null
    }
  }

  public render() {
    const { groupId } = this.props
    const groupTime = moment(groupId)

    const groupTimeLabel = !groupTime.isSame(moment(), "day")
      ? groupTime.format("DD.MM.YY")
      : "TODAY"

    return (
      <div className="group">
        <div className="title">
          <span>{groupTimeLabel}</span>
          <div className="clear" onClick={this.clearIt}>
            <Ionicon icon="md-close" fontSize="14px" color="#A8B2BD" />
          </div>
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    )
  }
}
