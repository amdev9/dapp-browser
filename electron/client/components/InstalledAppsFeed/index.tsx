import AppCard from '../AppsFeed/AppCard';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { DApp } from '../../redux/model';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../../redux/reducers/state';
import * as TrayActions from '../../redux/actions/tray';

import './InstalledAppsFeed.sass';

interface IProps {
  switchDapp?: (dappName?: string) => void;
  feedItems?: DApp[];
}

class InstalledAppsFeed extends React.Component<IProps> {
  renderAppCardsList() {
    if (!this.props.feedItems || !this.props.feedItems.length) {
      return (
        <div className="empty-list">
          Apps list is empty...
        </div>
      );
    }

    return this.props.feedItems.map((item): JSX.Element => (
      <AppCard key={item.appName} hideAction={true} dapp={item} switchDapp={() => this.props.switchDapp(item.appName)}/>
    ));
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="title">
            Your apps
          </div>
          <Link className="action action-navigation" to="/market">Go to market</Link>
        </div>
        <div className="list">
          {this.renderAppCardsList()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  switchDapp: TrayActions.switchDapp,
}, dispatch);

const mapStateToProps = (state: IState) => ({
  feedItems: state.feed.items,
});

export default connect<IProps>(mapStateToProps, mapDispatchToProps)(InstalledAppsFeed);
