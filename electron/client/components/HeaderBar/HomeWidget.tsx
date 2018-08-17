import * as React from "react"
 
const homeIcon = require("../../assets/icons/home.svg");
 
interface HomeWidgetProps {
  toggleHome?(): void
}

export class HomeWidget extends React.Component<HomeWidgetProps> {
  public render() {
    const { toggleHome } = this.props;
    return (
      <div className="header" onClick={() => toggleHome()}>
        <img className="icon" src={homeIcon} />
      </div>
    )
  }
}

 