import * as React from 'react';
import { Link } from 'react-router-dom';

import MarketCard from '../MarketCard';
import { component as AppsManager } from '../../modules/AppsManager';

interface IProps {
  navigateToInstalled: () => void;
}

interface IState {
  isFetching: boolean;
  dappListSuccess: any;
  dappListFailure: any;
}

export default class MarketFeed extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFetching: false,
      dappListSuccess: null,
      dappListFailure: null,
    };
  }

  async getAllDapps() {
    this.setState({
      isFetching: true,
      dappListSuccess: null,
      dappListFailure: null,
    });

    try {
      const dapps = await AppsManager.getAllDapps();
      this.setState({
        isFetching: false,
        dappListSuccess: dapps,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
        dappListFailure: error,
      });
    }
  }

  async componentDidMount() {
    this.getAllDapps();
  }

  renderError() {
    const { dappListFailure } = this.state;

    return (
      <div>
        Error loading: {dappListFailure}
      </div>
    );
  }

  renderAppCardsList() {
    const { dappListSuccess } = this.state;

    return dappListSuccess && dappListSuccess.map((item: any): JSX.Element => (
      <MarketCard key={item.appName} dapp={item} updateAllDapps={this.getAllDapps.bind(this)}/>
    ));
  }

  renderSuccess() {

    return (
      <div>
        <div className="header">
          <div className="title">
            Market apps
          </div>
          <div className="action">
            <div className="action action-navigation" onClick={this.props.navigateToInstalled}>
              My apps
            </div>
          </div>
        </div>
        <div className="list">
          {this.renderAppCardsList()}
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  render() {
    const { isFetching, dappListSuccess, dappListFailure } = this.state;

    if (isFetching) {
      return this.renderLoading();
    }

    if (dappListFailure) {
      return this.renderError();
    }

    if (dappListSuccess) {
      return this.renderSuccess();

    }
    return null;
  }
}
