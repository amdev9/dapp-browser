import { RootState } from "app/reducers"
import { connect } from "react-redux"
import * as React from "react"

export namespace KeychainMenu {
  export interface Props {

  }

  export interface State {

  }
}

@connect((state: RootState): any => {
  return {
    // ... some data
  }
})

export class KeychainMenu extends React.Component<KeychainMenu.Props, KeychainMenu.State> {
  constructor(props: KeychainMenu.Props) {
    super(props)
  }

  public state: KeychainMenu.State = {

  }

  public render() {
    return (
      <div className="keychain-menu">
        Hello World
      </div>
    )
  }
}
