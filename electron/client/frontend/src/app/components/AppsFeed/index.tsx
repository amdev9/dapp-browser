import { RouteComponentProps } from "react-router"
import { AppCard } from "app/components/AppCard"
import { RootState } from "app/reducers"
import { connect } from "react-redux"
import { DApp } from "app/models"
import * as React from "react"

export namespace AppsFeed {
  export interface Props extends RouteComponentProps<void> {

  }

  export interface State {

  }
}

@connect((state: RootState): any => {
  return {
    // ... some data
  }
})

export class AppsFeed extends React.Component<AppsFeed.Props, AppsFeed.State> {
  public state: AppsFeed.State = {

  }

  public render() {
    const cardPropsInstall: AppCard.Props = {
      action: AppCard.TargetAction.Install,
      size: AppCard.Size.Default,
      dapp: DApp.make(),
    }

    const cardPropsUpdate: AppCard.Props = {
      action: AppCard.TargetAction.Install,
      size: AppCard.Size.Default,
      dapp: DApp.make(),
    }

    return (
      <div className="feeds">
        <div className="header">
          <div className="title">
            Often Used
          </div>

          <div className="action">
            <span>Go to market</span>
          </div>
        </div>

        <div className="list">
          <AppCard key="i-1" {...cardPropsInstall} />
          <AppCard key="i-2" {...cardPropsUpdate} />
        </div>
      </div>
    )
  }
}
