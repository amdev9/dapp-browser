import * as React from "react" 
import { AppCard } from "./AppCard"

interface AppsFeedProps {
  toggleAppHome?: (dappName?: string) => any
}

export class AppsFeed extends React.Component<AppsFeedProps> {
  public render() {
    const cardPropsInstall  = {
      dapp: {
        preview: require("../../assets/app-images/thumb.png"),
        icon: require("../../assets/app-icons/exchange.svg"),
        categories: ["games", "tools"],
        name: "My Awesome Dapp 1",
      },
    }
    const cardPropsUpdate = {
      dapp: {
        preview: require("../../assets/app-images/thumb.png"),
        icon: require("../../assets/app-icons/exchange.svg"),
        categories: ["games", "tools"],
        name: "My Awesome Dapp 2",
      },
    }
    
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
          <AppCard key="i-1" {...cardPropsInstall} {...this.props} />
          <AppCard key="i-2" {...cardPropsUpdate} {...this.props} />
        </div>
      </div>
    )
  }
}