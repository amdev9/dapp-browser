import * as React from "react"
import AppCard from "./AppCard"
import { DApp } from "../../redux/model";
import { MemoryRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';

import MarketFeed from '../MarketFeed';
import InstalledAppsFeed from '../InstalledAppsFeed';

class AppsFeed extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div className="feeds">
        <Switch>
          <Route exact path="/" component={ InstalledAppsFeed } />
          <Route path="/market" component={ MarketFeed } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AppsFeed);
