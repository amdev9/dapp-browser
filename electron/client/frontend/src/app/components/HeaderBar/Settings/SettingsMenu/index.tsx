import { RootState } from "app/reducers"
import { connect } from "react-redux"
import * as React from "react"

export namespace SettingsMenu {
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

export class SettingsMenu extends React.Component<SettingsMenu.Props, SettingsMenu.State> {
  constructor(props: SettingsMenu.Props) {
    super(props)
  }

  public state: SettingsMenu.State = {

  }

  public render() {
    return (
      <div className="settings-menu">
        <ul>
          <li>General</li>
          <li>Access</li>
          <li>Network</li>
          <li>Quit</li>
        </ul>
      </div>
    )
  }
}
