import Dropdown, { DropdownProps } from "rc-dropdown"
import { RootState } from "app/reducers"
import { connect } from "react-redux"
import * as React from "react"
import { SettingsMenu } from './SettingsMenu'
// Assets

const settingsIcon = require("../../../../assets/icons/settings.svg")

export namespace Settings {
  export interface Props {

  }

  export interface State {
    isOpen: boolean
  }
}

@connect((state: RootState): any => {
  return {
    // ... some data
  }
})

export class Settings extends React.Component<Settings.Props, Settings.State> {
  constructor(props: Settings.Props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  public state: Settings.State = {
    isOpen: false,
  }

  private toggle(status: boolean) {
    // const { isOpen } = this.state

    // Toggle And clear
    this.setState({
      isOpen: status,
    })
  }

  public render() {
    const { isOpen } = this.state

    const props: DropdownProps = {
      prefixCls: "settings-tooltip",
      overlay: <SettingsMenu />,
      placement: "bottomRight",
      animation: "slide",
      trigger: ["click"],
      visible: isOpen,

      onVisibleChange: (visible) => {
        this.setState({ isOpen: visible })
      },
    }

    return (
      <Dropdown {...props}>
        <div className="settings">
          <img className="icon" src={settingsIcon} />
        </div>
      </Dropdown>
    )
  }
}
