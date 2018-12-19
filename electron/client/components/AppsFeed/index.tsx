import * as React from 'react';

import MarketFeed from '../MarketFeed';
import InstalledAppsFeed from '../InstalledAppsFeed';

interface IProps {}

interface IState {
  currentPage: string;
}

export default class AppsFeed extends React.Component<IProps, IState> {
  static pages = {
    INSTALLED_APPS: 'INSTALLED_APPS',
    MARKET_FEED: 'MARKET_FEED',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      currentPage: AppsFeed.pages.INSTALLED_APPS,
    };
  }

  setInstalledPage() {
    this.setState({ currentPage: AppsFeed.pages.INSTALLED_APPS });
  }

  setMarketPage() {
    this.setState({ currentPage: AppsFeed.pages.MARKET_FEED });
  }

  renderCurrentPage() {
    const { currentPage } = this.state;

    switch (currentPage) {
      case AppsFeed.pages.INSTALLED_APPS:
        return <InstalledAppsFeed navigateToMarket={this.setMarketPage.bind(this)}/>;
      case AppsFeed.pages.MARKET_FEED:
        return <MarketFeed navigateToInstalled={this.setInstalledPage.bind(this)}/>;
      default:
        return <InstalledAppsFeed navigateToMarket={this.setMarketPage.bind(this)}/>;
    }
  }

  public render() {
    return (
      <div className="feeds">
        {this.renderCurrentPage()}
      </div>
    );
  }
}
