import * as React from "react"
// import { bindActionCreators, Dispatch } from "redux"
// import { connect } from "react-redux"
// import { NotificationsActions } from "app/actions"
// import { RootState } from "app/reducers"
// import { Keychain } from "app/components/HeaderBar/Keychain"
// import { Settings } from "app/components/HeaderBar/Settings"

// import { SuggestSearch } from "./SuggestSearch"
// Assets
const notificationIcon = require("../../assets/icons/notification.svg")
const homeIcon = require("../../assets/icons/home.svg")

export namespace HeaderBar {
  export interface Props {
    togglePopup?: (opened?: boolean) => Promise<void>,
  }

  export interface State {

  }
}

// const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
//   togglePopup: NotificationsActions.togglePopup,
// }, dispatch)

// const mapStateToProps = (state: RootState): RootState => {
//   return state
// }

// @connect(mapStateToProps, mapDispatchToProps)
export class HeaderBar extends React.Component<HeaderBar.Props, HeaderBar.State> {
  constructor(props: HeaderBar.Props) {
    super(props)

    this.notificationsToggle = this.notificationsToggle.bind(this)
  }

  public state: HeaderBar.State = {

  }

  private notificationsToggle() {
    const { togglePopup } = this.props
    if (togglePopup) {
      togglePopup()
    }
  }

  public render() {
    return (
      <div className="headerbar">
        <div className="header">
          <img className="icon" src={homeIcon} />
        </div>

        <div className="title">
          HOME
        </div>

        <div className="actions">
          {/* <SuggestSearch /> */}

          <div className="unions">
            <div className="network">
              MAINNET
            </div>

            {/* <Keychain /> */}
            {/* <Settings /> */}

            <div className="notifications" onClick={this.notificationsToggle}>
              <img className="icon" src={notificationIcon} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
