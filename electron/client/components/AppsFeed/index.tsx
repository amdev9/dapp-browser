import * as React from "react" 
import { AppCard } from "./AppCard"

export class AppsFeed extends React.Component {
  public render() {
    const cardPropsInstall  = {
      dapp: {
        preview: require("../../assets/app-images/thumb.png"),
        icon: require("../../assets/app-icons/exchange.svg"),
        categories: ["games", "tools"],
        name: "My Awesome Dapp",
      },
    }
    const cardPropsUpdate = {
      dapp: {
        preview: require("../../assets/app-images/thumb.png"),
        icon: require("../../assets/app-icons/exchange.svg"),
        categories: ["games", "tools"],
        name: "My Awesome Dapp",
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
          <AppCard key="i-1" {...cardPropsInstall} />
          <AppCard key="i-2" {...cardPropsUpdate} />
        </div>
      </div>
    )
  }
}