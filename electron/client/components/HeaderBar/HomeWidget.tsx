import * as React from 'react';

import CustomNav from '../CustomNav';
import { HOME } from '../../router/routes';

const homeIcon = require('../../assets/icons/home_background.svg');
const homeIconActive = require('../../assets/icons/home.svg');

interface HomeWidgetProps {
  toggleHome(): void;
  isHome: boolean;
}

export class HomeWidget extends React.Component<HomeWidgetProps> {
  public render() {
    const { toggleHome, isHome } = this.props;

    function handleClick() {
      toggleHome();
    }

    const icon = isHome ? homeIconActive : homeIcon;

    return (
      <div className="header" onClick={handleClick}>
        <CustomNav to={HOME}>
          <img className="icon" src={icon} />
        </CustomNav>
      </div>
    );
  }
}
