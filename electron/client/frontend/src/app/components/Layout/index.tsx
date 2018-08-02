import { RootState } from "app/reducers"
import * as React from "react"
import { connect } from "react-redux"
// import { Route, Switch } from "react-router"

// Widgets
import { Notifications } from "app/components/Notifications"
import { HeaderBar } from "app/components/HeaderBar"
import { StatusBar } from "app/components/StatusBar"
import { Tray } from "app/components/Tray"

// Screens
// import { AppsFeed } from "app/containers/AppsFeed"

export namespace Layout {
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

export class Layout extends React.Component<Readonly<Layout.Props>, Layout.State> {
  public state: Layout.State = {

  }

  public render() {
    return [
      <HeaderBar key="root-headerbar" />,
      <Notifications key="root-notifications" />,

      <div key="root-content" id="root-container" className="content-zone">
        <Tray />

        <div className="content" id="content-wrap">
          <main className="page-container">
            {/* <Switch>
              <Route path="/" component={AppsFeed} />
            </Switch> */}
          </main>

          <StatusBar />
        </div>
      </div>,
    ]
  }
}
