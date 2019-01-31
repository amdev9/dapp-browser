import * as React from 'react';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import * as cn from 'classnames';

import { AppItem as AppItemModel } from '../../redux/model';
import { ActiveDapp, IState } from '../../redux/reducers/state';
import { bindActionCreators, Dispatch } from 'redux';
import { actions as AppsManagerActions } from '../../modules/AppsManager';

interface AppsItemProps {
  item?: AppItemModel;
}

interface StateProps {
  activeDapp: ActiveDapp;
}

interface DispatchProps {
  openDapp: (dappName: string) => void;
}

const mapStateToProps = (state: IState): StateProps => ({
  activeDapp: state.tray.activeDapp,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>): DispatchProps => bindActionCreators({
  openDapp: AppsManagerActions.openDapp,
}, dispatch);

class AppItem extends React.Component<AppsItemProps & DispatchProps & StateProps> {

  private getIndicator(item: AppItemModel): JSX.Element | null {
    if (!item.indicator) {
      return <div/>;
    }
    return (
      <Line className="progress" percent={item.indicator}/>
    );
  }

  private getActionIndicator(item: AppItemModel): JSX.Element | null {
    const counter = item.counter;

    if (counter) {
      return (
        <div className="counter">
          {counter}
        </div>
      );
    }
    return null;

  }

  get isActiveDapp() {
    const { item, activeDapp } = this.props;

    return activeDapp && activeDapp.appName && activeDapp.appName === item.appName;
  }

  onClickIcon() {
    const { openDapp, item } = this.props;

    item.appName && openDapp(item.appName);
  }

  public render() {
    const { item } = this.props;

    return (
      <div className={cn('tray', 'item', item.statusIcon.join(' '), { active: this.isActiveDapp })}>
        <div className="icon">
          <img src={item.icon} alt={item.appName} onClick={this.onClickIcon.bind(this)}/>
        </div>
        <div className="process-indicator">
          {this.getIndicator(item)}
        </div>

        {this.getActionIndicator(item)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
