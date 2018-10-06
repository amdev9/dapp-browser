import * as React from "react"

import CustomNav from '../CustomNav';
import { SETTINGS } from "../../router/routes"

const loaderIcon = require("../../assets/icons/settings.svg")

interface SettingsWidgetProps {
  //isOpen?: boolean;
  toggleHome?(): void
}
export class SettingsWidget extends React.Component<SettingsWidgetProps> {
  public render() {

    const { toggleHome } = this.props;
    return (
      <div onClick={() => toggleHome()}>
        <CustomNav to={SETTINGS}>
          <img className="icon" src={loaderIcon} />
        </CustomNav>
      </div>
    )
  }
}
