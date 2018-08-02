import * as React from "react"
import { connect } from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import { bindActionCreators, Dispatch } from "redux"
import * as Sortable from "react-sortable-hoc"
import { TrayActions, StatusBarActions } from "app/actions"
import { RootState } from "app/reducers"
import { TrayItem } from "app/models"
import { AppsList } from "./AppsList"


// Assets
const indicatorIcon = require("../../../assets/icons/indicator.svg")
const closeIcon = require("../../../assets/icons/close.svg")

export namespace Tray {
  export interface Props {
    toggleStatusBar?: (isOpen?: StatusBarActions.Payload.Toggle) => Promise<void>
    setPosition?: (params: TrayActions.Payload.SetPosition) => Promise<void>
    statusBarisOpen?: boolean
    activeKeys?: string[]
    pinnedKeys?: string[]
  }

  export interface State { }
}

interface TrayReduxProps {
  statusBarisOpen: boolean
  activeKeys: string[]
  pinnedKeys: string[]
}

const mapStateToProps = (state: RootState): TrayReduxProps => {
  return {
    statusBarisOpen: state.statusbar.isOpen,
    activeKeys: state.tray.activeKeys,
    pinnedKeys: state.tray.pinnedKeys,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  toggleStatusBar: StatusBarActions.toggleStatusBar,
  setPosition: TrayActions.setPosition,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export class Tray extends React.Component<Tray.Props, Tray.State> {
  private readonly onSortEnd: Sortable.SortEndHandler
  public state: Tray.State = {}

  constructor(props: Tray.Props) {
    super(props)

    this.getBottomToggle = this.getBottomToggle.bind(this)
    this.onSortEnd = this.updateSort.bind(this)
  }

  private updateSort(type: TrayItem.Type, sort: Sortable.SortEnd, event: Sortable.SortEvent): void {
    if (this.props.setPosition) {
      this.props.setPosition({
        oldIndex: sort.oldIndex,
        newIndex: sort.newIndex,
        type,
      })
    }
  }

  // private getDerivedStateFromProps(props: Tray.Props, state: Tray.State) {
  //   setTimeout(() => {
  //     this.forceUpdate()
  //   }, 200)
  // }

  private getBottomToggle(): JSX.Element {
    let { statusBarisOpen } = this.props
    statusBarisOpen = !!statusBarisOpen

    const statusIcon = statusBarisOpen ? closeIcon : indicatorIcon

    const toggle = () => {
      const { toggleStatusBar } = this.props
      if (toggleStatusBar) {
        toggleStatusBar()
      }
    }

    return (
      <div className="bottom" onClick={toggle}>
        <div className="indicator">
          <img src={statusIcon} />
        </div>
      </div>
    )
  }

  public render() {
    let { activeKeys, pinnedKeys } = this.props
    activeKeys = activeKeys ? activeKeys : []
    pinnedKeys = pinnedKeys ? pinnedKeys : []

    const sortActiveHandler = this.onSortEnd.bind(this, TrayItem.Type.Active)
    const sortPinnedHandler = this.onSortEnd.bind(this, TrayItem.Type.Pinned)

    return (
      <div className="tray">
        <PerfectScrollbar option={{ suppressScrollX: true }}>
          <AppsList
            itemsType={TrayItem.Type.Pinned}
            onSortEnd={sortPinnedHandler}
            lockToContainerEdges={true}
            transitionDuration={200}
            helperClass="non-scale"
            itemsKeys={pinnedKeys}
            useDragHandle={true}
            pressDelay={100}
            axis="y"
          />

          <div className="divider" />

          <AppsList
            itemsType={TrayItem.Type.Active}
            onSortEnd={sortActiveHandler}
            lockToContainerEdges={true}
            transitionDuration={200}
            helperClass="non-scale"
            itemsKeys={activeKeys}
            useDragHandle={true}
            pressDelay={100}
            axis="y"
          />
        </PerfectScrollbar>
        {this.getBottomToggle()}
      </div>
    )
  }
}
