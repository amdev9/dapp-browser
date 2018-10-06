import * as React from "react"

import CustomNav from '../CustomNav';
import { HOME } from "../../router/routes"

const homeIcon = require("../../assets/icons/home.svg");

interface HomeWidgetProps {
  toggleHome?(): void
}

export class HomeWidget extends React.Component<HomeWidgetProps> {
  public render() {
    const { toggleHome } = this.props;
    function handleClick() {
      toggleHome();
    }

    return (
      <div className="header" onClick={handleClick}>
        <CustomNav to={HOME}>
          <img className="icon" src={homeIcon} />
        </CustomNav>
      </div>
    )
  }
}
