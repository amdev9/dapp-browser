import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IState } from '../../redux/reducers/state';
import * as TrayActions from '../../redux/actions/tray';

import './AppCard.sass';
import { actions as AppsManagerActions } from '../../modules/AppsManager';

interface AppCardProps {
  dapp?: any;
}

interface AppCardConnectProps {
  openDapp: (dappName: string) => void;
  installDapp?: (dappName: string, hash: string) => void;
}

interface AppCardState {
  status: string;
}

export class AppCard extends React.Component<AppCardProps & AppCardConnectProps, AppCardState> {
  constructor(props: AppCardProps & AppCardConnectProps) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.actionHandle = this.actionHandle.bind(this);

    this.state = {
      status: '',
    };
  }

  private getCategories(): JSX.Element {
    const { dapp } = this.props;
    const items = dapp.categories && dapp.categories.map((item: any, index: number): JSX.Element => (
      <div key={`tag-${index}`} className="tag">
        <span>{item}</span>
      </div>
    ));
    return (
      <div className="tags">
        {items}
      </div>
    );
  }

  private async actionHandle(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    // @TODO: add functionaly cb wrapper here\
    this.setState({
      status: 'install',
    });
  }

  onClickAppCard() {
    const { dapp, openDapp } = this.props;

    return openDapp(dapp.appName);
  }

  public render() {
    const { dapp } = this.props;
    return (
      <div className="app-card" onClick={this.onClickAppCard.bind(this)}>
        <div className="header" style={{ backgroundImage: `url('${dapp.preview || ''}')` }}>
        </div>
        <div className="content">
          <div className="title">{dapp.appName}</div>
          <div className="footer">
            {this.getCategories()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IState>): AppCardConnectProps => bindActionCreators({
  switchDapp: TrayActions.switchDapp,
  openDapp: AppsManagerActions.openDapp,
}, dispatch);

export default connect(null, mapDispatchToProps)(AppCard);
