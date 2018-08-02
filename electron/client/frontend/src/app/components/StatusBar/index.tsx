import * as React from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { StatusBarItem } from "app/models"
import { RootState } from "app/reducers"
import { Bar } from "./Bar"

export namespace StatusBar {
  export interface Props {
    items?: _.Dictionary<StatusBarItem>
    keysByItem?: string[]
    isOpen?: boolean
  }

  export interface State {

  }
}

const mapStateToProps = (state: RootState): RootState.StatusBar => {
  return state.statusbar
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({

}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export class StatusBar extends React.Component<StatusBar.Props, StatusBar.State> {
  constructor(props: StatusBar.Props) {
    super(props)

    this.getList = this.getList.bind(this)
  }

  public state: StatusBar.State = {

  }

  public getList(): JSX.Element[] {
    const { items, keysByItem } = this.props

    if (items && keysByItem) {
      return keysByItem.map((itemKey, index) => (
        <Bar
          key={`${itemKey}-${index}`}
          item={items[itemKey]}
        />
      ))
    } else {
      // @todo replace next
      return [

      ]
    }
  }

  public render() {
    let { isOpen, keysByItem } = this.props
    keysByItem = keysByItem ? keysByItem : []
    isOpen = !!isOpen

    const props: any = {
      className: "statusbar",
      style: isOpen ? { transform: "translate(0,0)" } : {
        transform: `translate(0, ${(keysByItem.length * 50)}px)`,
        position: "absolute", bottom: "0px",
      },
    }

    return (
      <div {...props}>
        {this.getList()}
      </div>
    )
  }
}
