import * as React from "react"
import AppCard from "./AppCard"
import { DApp } from "../../redux/model";
import { MemoryRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';

interface AppsFeedProps {
  items?: DApp[];
  switchDapp?: (dappName?: string) => void;
  resizeAppsFeed?: (width: number, height: number) => any;
  downloadDapp: (ipfsHash: string) => void;
}

class AppsFeed extends React.Component<RouteComponentProps & AppsFeedProps> {
  renderOurApps() {
    const appCardsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
      <AppCard key={item.appName} dapp={item} switchDapp={() => this.props.switchDapp(item.appName)} />
    ));

    return (
      <div>
        <div className="header">
          <div className="title">
            Your apps
          </div>
          <div className="action">
            <Link to="/market">Go to market</Link>
            {/*<span onClick={() => this.props.downloadDapp('QmZdU95L4os5nrLhBm7envsXB746b8UHEe1imY5ZD87cgw')}>Go to market</span>*/}
          </div>
        </div>
        <div className="list">
          {appCardsList}
        </div>
      </div>
    )
  }

  public render() {
    const { match } = this.props;
    console.log('maaatch', this.props)

    return (
      <div className="feeds">
        <Switch>
          <Route exact path='/' component={ this.renderOurApps.bind(this) } />
          <Route path="/market" component={ () => <div>Market</div> } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AppsFeed);
