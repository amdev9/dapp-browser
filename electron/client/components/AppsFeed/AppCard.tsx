import { MoonLoader } from 'react-spinners';
import * as React from 'react';
import * as cn from 'classnames';
import { DApp } from '../../redux/model';
// import { MoonLoader } from "react-spinners";

import './AppCard.sass';

interface AppCardProps {
  dapp?: any;
  switchDapp: () => void;
}

interface AppCardState {
  status: string;
}

export class AppCard extends React.Component<AppCardProps, AppCardState> {
  constructor(props: AppCardProps) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.actionHandle = this.actionHandle.bind(this);
    this.state = {
      status: '',
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

  private getAction(): JSX.Element {
    const { dapp } = this.props;
    const { status } = this.state;

    // @TODO: next add spinner type by status
    // e.g for updated or install indicator is progress
    const spinner = (
      <div className="loading">
        <MoonLoader color="#508dff" size={13}/>
      </div>
    );

    // const content = status ? spinner : label;

    return (
      <div className={cn('action', { action_installed: dapp.installed })} onClick={this.actionHandle}>
        {dapp.installed ? 'Open' : 'Install'}
      </div>
    );
  }

  public render() {
    const { dapp, switchDapp } = this.props;
    return (
      <div className="app-card" onClick={switchDapp}>
        <div className="header" style={{ backgroundImage: `url('${dapp.preview || ''}')` }}>
        </div>
        <div className="content">
          <div className="title">{dapp.appName}</div>
          <div className="footer">
            {this.getCategories()}
            {this.getAction()}
          </div>
        </div>
      </div>
    );
  }
}
