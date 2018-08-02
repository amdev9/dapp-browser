import { RootState } from "app/reducers"
import { connect } from "react-redux"
import Dropdown, { DropdownProps } from "rc-dropdown"
import * as React from "react"
import { KeychainMenu } from "./KeychainMenu"

// Assets
const keyIcon = require("../../../../assets/icons/key.svg")

export namespace Keychain {
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

export class Keychain extends React.Component<Keychain.Props, Keychain.State> {
  constructor(props: Keychain.Props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  public state: Keychain.State = {
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
      prefixCls: "keychain-tooltip",
      overlay: <KeychainMenu />,
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
        <div className="keychain">
          <img className="icon" src={keyIcon} />
          <div className="keyname">wallet</div>
        </div>
      </Dropdown>
    )
  }
}
