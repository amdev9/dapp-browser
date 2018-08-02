import { BeatLoader, ClipLoader } from "react-spinners"
import { bindActionCreators, Dispatch } from "redux"
import * as Sortable from "react-sortable-hoc"
import { TrayActions } from "app/actions"
import { RootState } from "app/reducers"
import { connect } from "react-redux"
import { TrayItem } from "app/models"
import Ionicon from "react-ionicons"
import { Line } from "rc-progress"
import { Some } from "space-lift"
import * as React from "react"

export namespace AppItem {
  export interface Props {
    setPosition?: (params: TrayActions.Payload.SetPosition) => Promise<void>
    removeItem?: (payload: TrayActions.Payload.RemoveItem) => Promise<void>
    unpin?: (index: number) => Promise<void>
    pin?: (index: number) => Promise<void>

    itemsType: TrayItem.Type
    itemKey: string

    items?: {
      active: _.Dictionary<TrayItem>,
      pinned: _.Dictionary<TrayItem>,
    }
  }

  export interface State {
    actionsIsOpen: boolean
  }
}

interface ReduxProps {
  activeKeys: string[],
  pinnedKeys: string[],

  items: {
    active: _.Dictionary<TrayItem>,
    pinned: _.Dictionary<TrayItem>,
  }
}
const mapStateToProps = (state: RootState): ReduxProps => ({
  activeKeys: state.tray.activeKeys,
  pinnedKeys: state.tray.pinnedKeys,

  items: {
    active: state.tray.activeItems,
    pinned: state.tray.pinnedItems,
  },
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setPosition: TrayActions.setPosition,
  removeItem: TrayActions.removeItem,
  unpin: TrayActions.unpin,
  pin: TrayActions.pin,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export class AppItem extends React.Component<AppItem.Props, AppItem.State> {
  constructor(props: AppItem.Props) {
    super(props)

    this.getActionIndicator = this.getActionIndicator.bind(this)
    this.getStatusClasses = this.getStatusClasses.bind(this)
    this.getIndicator = this.getIndicator.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.openItemMenu = this.openItemMenu.bind(this)
    this.activateApp = this.activateApp.bind(this)
    this.getActions = this.getActions.bind(this)
    this.closeApp = this.closeApp.bind(this)
    this.pinner = this.pinner.bind(this)
  }

  public state: AppItem.State = {
    actionsIsOpen: false,
  }

  private async activateApp() {
    console.log("activate current app")
  }

  private async openItemMenu() {
    console.log("open item menu of current app")
  }

  private clickHandler(event: React.MouseEvent<HTMLElement>) {
    const { nativeEvent: { which } } = event

    if (which === 1) {
      this.activateApp()
    } else if (which === 3) {
      this.openItemMenu()
      event.preventDefault()
    }
  }

  private getIndicator(item: TrayItem): JSX.Element | null {
    const { indicator, disabled } = item

    if (!indicator.isDefined()) {
      return <div />
    } else {
      const indicatorType = indicator.get()

      switch (+indicatorType) {
        case TrayItem.Indicator.Loading: {
          return !disabled ? (
            <BeatLoader size={3} color="#5791fe" />
          ) : null
        }

        case TrayItem.Indicator.Progress: {
          return (
            <Line className="progress" percent={45} />
          )
        }

        // @note: typescript not check all variant of enum was implemented
        default: { return null }
      }
    }
  }

  private getStatusClasses(item: TrayItem): string {
    const { running, active, disabled, loading } = item
    const classes = []

    if (disabled) { classes.push("disabled") }
    if (loading) { classes.push("loading") }
    if (running) { classes.push("running") }
    if (active) { classes.push("active") }

    return classes.join(" ")
  }

  private async pinner(item: TrayItem, event: React.MouseEvent<HTMLElement>) {
    const { pin, unpin, setPosition } = this.props
    if (pin && unpin && setPosition) {
      const action = item.pin ? unpin : pin
      await action(item.position)

      // Hack of props render work
      setTimeout(async () => {
        await setPosition({
          type: pin ? TrayItem.Type.Pinned : TrayItem.Type.Active,
          oldIndex: 0,
          newIndex: 0,
        })
      }, 100)
    }
  }

  private async closeApp(item: TrayItem, event: React.MouseEvent<HTMLElement>) {
    const { removeItem } = this.props

    if (removeItem) {
      await removeItem({
        type: item.pin ? TrayItem.Type.Pinned : TrayItem.Type.Active,
        item: item.name,
      })
    }
  }

  private getActions(item: TrayItem): JSX.Element | null {
    const { actionsIsOpen } = this.state

    if (!actionsIsOpen) {
      return null
    } else {
      const closeApp = this.closeApp.bind(this, item)
      const pinner = this.pinner.bind(this, item)

      return (
        <div className="actions">
          {!item.running ? <div /> : (
            <div className="close" onClick={closeApp}>
              <Ionicon icon="md-close" fontSize="10px" color="#e7545d" />
            </div>
          )}

          <div className={`pin ${item.pin ? "pinned" : "unpined"}`} onClick={pinner}>
            <Ionicon icon="md-key" fontSize="10px" color={item.pin ? "#b1bbc8" : "#4686ff"} />
          </div>
        </div>
      )
    }
  }

  private getActionIndicator(item: TrayItem): JSX.Element | null {
    const { disabled, loading, counter, indicator } = item
    const { actionsIsOpen } = this.state

    const isIndicatorCounter = indicator.isDefined() && indicator.get() === TrayItem.Indicator.Counter
    const isUpdating = disabled && loading

    if (actionsIsOpen) {
      return null
    } else {
      if (isUpdating) {
        return (
          <div className="updating">
            <ClipLoader color="#FFF" size={8} />
          </div>
        )
      } else if (counter.isDefined() && isIndicatorCounter) {
        const count = counter.orElse(() => Some(0)).get()

        return (
          <div className="counter">
            {count}
          </div>
        )
      } else {
        return null
      }
    }
  }

  public render() {
    const { items, itemKey, itemsType } = this.props
    const typeItems: "active" | "pinned" = itemsType === TrayItem.Type.Pinned ? "pinned" : "active"

    if (!items) {
      return null
    } else {
      const item = items[typeItems][itemKey]
      if (!item) { return null }

      const statusClasses = this.getStatusClasses(item)
      const { name, icon } = item

      const itemProps: any = {
        className: `tray item ${statusClasses}`,
        onContextMenu: this.clickHandler,
        onClick: this.clickHandler,
      }

      const itemRootProps: any = {
        onMouseLeave: () => this.setState({ actionsIsOpen: false }),
        onMouseEnter: () => this.setState({ actionsIsOpen: true }),
        className: "tray root-item",
      }

      const DragHandle = Sortable.SortableHandle(() => <img src={icon} alt={name} />)

      return (
        <div {...itemRootProps}>
          <div {...itemProps}>
            <div className="icon">
              <DragHandle />
            </div>
            <div className="process-indicator">
              {this.getIndicator(item)}
            </div>

            {this.getActionIndicator(item)}
          </div>
          {this.getActions(item)}
        </div>
      )
    }
  }
}
