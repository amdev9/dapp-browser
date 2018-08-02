import { slide as Menu, Props as MenuProps } from "react-burger-menu"
import PerfectScrollbar from "react-perfect-scrollbar"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import * as React from "react"
import * as _ from "lodash"
import { NotificationsActions } from "app/actions"
import { RootState } from "app/reducers"
import { NotifyItem } from "app/models"
import { NotifyGroup as Group } from "./NotifyGroup"

// assets
const filterIcon = require("../../../assets/icons/filter.svg")

export namespace Notifications {
  export interface Props {
    togglePopup?: (opened?: boolean) => Promise<void>,
    items?: _.Dictionary<NotifyItem[]>
    keysByItem?: string[]
    isOpen?: boolean
  }

  export interface State {

  }
}

const mapStateToProps = (state: RootState): RootState.Notifications => {
  return state.notifications
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  togglePopup: NotificationsActions.togglePopup,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export class Notifications extends React.Component<Notifications.Props, Notifications.State> {
  constructor(props: Notifications.Props) {
    super(props)
    this.getList = this.getList.bind(this)
  }

  public state: Notifications.State = {

  }

  private getList(): JSX.Element[] | JSX.Element {
    const { items, keysByItem } = this.props

    if (!items || !keysByItem) {
      return (
        <div className="empty">

        </div>
      )
    } else {
      return keysByItem.map((groupId, index) => (
        <Group
          key={`${new Date(groupId).getTime()}-${index}`}
          items={items[groupId]}
          groupId={groupId}
        />
      ))
    }
  }

  public render() {
    let { isOpen } = this.props
    isOpen = isOpen ? isOpen : false

    const menuProps: MenuProps = {
      outerContainerId: "root-container",
      pageWrapId: "content-wrap",
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen,

      onStateChange: (value) => {
        const { togglePopup } = this.props

        if (togglePopup && (value.isOpen !== isOpen)) {
          togglePopup(value.isOpen)
        }
      },
    }

    return (
      <Menu {...menuProps}>
        <div className="notifications-popup">
          <div className="header">
            <h4>Notifications</h4>
            <div className="filter">
              <img src={filterIcon} />
            </div>
          </div>

          <PerfectScrollbar>
            <div className="groups">
              {this.getList()}
            </div>
          </PerfectScrollbar>
        </div>
      </Menu>
    )
  }
}
