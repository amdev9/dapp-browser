import * as React from "react" 
import { AppCard } from "./AppCard"
import { Dapp } from "../../redux/model";

interface AppsFeedProps {
  items?: Dapp[]
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
    
    // const appCardsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
    //   <AppBox key={`${Math.random() * 1000}-${item.id}-${item.appName}`} item={item} />
    // ));

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