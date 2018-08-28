import * as React from "react" 
import { AppCard } from "./AppCard"
import { DApp } from "../../redux/model";

interface AppsFeedProps {
  items?: DApp[],
  toggleAppHome?: (dappName?: string) => any
}

export class AppsFeed extends React.Component<AppsFeedProps> {
  public render() {

    const appCardsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
      <AppCard key={item.appName} dapp={item} {...this.props} />
    ));

    return (  
      <div className="feeds">
        <div className="header">
          <div className="title">
            Your apps
          </div>
          <div className="action">
            <span>Go to market</span>
          </div>
        </div>
        <div className="list">
          {appCardsList}
        </div>
      </div>
    )
  }
}