import * as React from "react"
import { AppCard } from "./AppCard"
import { DApp } from "../../redux/model";

interface AppsFeedProps {
  items?: DApp[],
  toggleAppHome?: (dappName?: string) => any,
  resizeAppsFeed?: (width: number, height: number) => any;
  downloadDapp: (ipfsHash: string) => void;
  //settingsPanelIsOpen: boolean
}

export class AppsFeed extends React.Component<AppsFeedProps> {

  constructor(props: AppsFeedProps) {
    super(props);

    this.state = { activeTab: 'uploads' };
  }

  public render() {
    //const { settingsPanelIsOpen } = this.props;

    const appCardsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
      <AppCard key={item.appName} dapp={item} toggleAppHome={this.props.toggleAppHome} />
    ));

    //const props = { style: { display: settingsPanelIsOpen ? "none" : "block" } };

    return (
      <div className="feeds" /*{...props}*/>
        <div className="header">
          <div className="title">
            Your apps
          </div>
          <div className="action">
            <span onClick={() => this.props.downloadDapp('hash1')}>Go to market</span>
          </div>
        </div>
        <div className="list">
          {appCardsList}
        </div>
      </div>
    );
  }
}
