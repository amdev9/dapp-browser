import * as React from 'react';

import CustomNav from '../CustomNav';
import { HOME } from '../../router/routes';
import { connect } from 'react-redux';
import { ActiveDapp, IState } from '../../redux/reducers/state';
import { bindActionCreators, Dispatch } from 'redux';
import { actions as AppsManagerActions } from '../../modules/AppsManager';

const homeIcon = require('../../assets/icons/home_background.svg');
const homeIconActive = require('../../assets/icons/home.svg');

interface HomeWidgetProps {
  toggleHome(): void;
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

class HomeWidget extends React.Component<HomeWidgetProps & StateProps & DispatchProps> {
  public render() {
    const { toggleHome, activeDapp } = this.props;

    function handleClick() {
      toggleHome();
    }

    const icon = !activeDapp || !activeDapp.appName ? homeIconActive : homeIcon;

    return (
      <div className="header" onClick={handleClick}>
        <CustomNav to={HOME}>
          <img className="icon" src={icon} />
        </CustomNav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWidget);
