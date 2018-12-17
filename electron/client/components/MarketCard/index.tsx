import { MoonLoader } from 'react-spinners';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as cn from 'classnames';
import { IState } from '../../redux/reducers/state';
import * as TrayActions from '../../redux/actions/tray';
import { component as AppsManager } from '../../modules/AppsManager';

// import './InstalledAppsFeed.sass';
import * as MarketActions from '../../redux/actions/market';

interface AppCardProps {
  dapp?: any;
}

interface AppCardConnectProps {
  switchDapp?: (dappName: string) => void;
  installDapp?: (dappName: string, hash: string) => void;
  downloadDapp?: (ipfsHash: string) => void;
  updateAllDapps: () => void;
  hideAction?: boolean;
}

interface AppCardState {
  status: string;
  isInstalling: boolean;
  installSuccess: any;
  installFailure: any;
}

export class AppCard extends React.Component<AppCardProps & AppCardConnectProps, AppCardState> {
  constructor(props: AppCardProps & AppCardConnectProps) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.actionHandle = this.actionHandle.bind(this);

    this.state = {
      status: '',
      isInstalling: false,
      installSuccess: null,
      installFailure: null,
    };
  }

  private getCategories(): JSX.Element {
    const { dapp } = this.props;
    console.log('getCategories', dapp);
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

  getBadge() {
    const { dapp } = this.props;
    const { isInstalling, installSuccess } = this.state;

    if (isInstalling) {
      return (
        <div className="loading">
          <MoonLoader color="#508dff" size={13}/>
        </div>
      );
    }

    if (installSuccess) {
      return 'Open';
    }

    return dapp.installed ? 'Open' : 'Install';
  }

  private getAction(): JSX.Element {
    const { dapp } = this.props;
    const { installSuccess } = this.state;

    return (
      <div className={cn('action', { action_installed: dapp.installed || installSuccess })}>
        {this.getBadge()}
      </div>
    );
  }

  async installDapp() {
    const { dapp, updateAllDapps } = this.props;

    this.setState({
      isInstalling: true,
    });

    try {
      await AppsManager.installDapp(dapp.appName, dapp.hash);
      this.setState({ installSuccess: true, isInstalling: false });
    } catch (e) {
      this.setState({ installFailure: e, isInstalling: false });
    }
    // updateAllDapps();
  }

  onClickAppCard() {
    const { dapp, switchDapp } = this.props;
    const { isInstalling, installSuccess } = this.state;

    if (isInstalling) {
      return null;
    }

    console.log('appCARD', this.props, AppsManager);
    if (dapp.installed || installSuccess) {
      return switchDapp(dapp.appName);
    }

    return this.installDapp();
  }

  public render() {
    const { dapp, hideAction } = this.props;
    return (
      <div className="app-card" onClick={this.onClickAppCard.bind(this)}>
        <div className="header" style={{ backgroundImage: `url('${dapp.preview || ''}')` }}>
        </div>
        <div className="content">
          <div className="title">{dapp.appName}</div>
          <div className="footer">
            {this.getCategories()}
            {hideAction ? null : this.getAction()}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  switchDapp: TrayActions.switchDapp,
  downloadDapp: MarketActions.downloadDapp,
}, dispatch);

export default connect<AppCardProps, {}>(null, mapDispatchToProps)(AppCard);
