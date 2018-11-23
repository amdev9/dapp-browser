import * as React from 'react';

import CustomNav from '../CustomNav';
import { SETTINGS } from '../../router/routes';

const loaderIcon = require('../../assets/icons/settings.svg');
const loaderIconActive = require('../../assets/icons/settings_active.svg');

interface SettingsWidgetProps {
  togglePanel(): void;
  isOpen: boolean;
}
export class SettingsWidget extends React.Component<SettingsWidgetProps> {
  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? loaderIconActive : loaderIcon;
    return (
      <div onClick={() => togglePanel()}>
        <CustomNav to={SETTINGS}>
          <img className="icon" src={icon} />
        </CustomNav>
      </div>
    );
  }
}
