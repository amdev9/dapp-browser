import * as React from "react"
import { DApp } from '../../redux/model';
// import { MoonLoader } from "react-spinners";

interface AppCardProps {
  dapp?: DApp,
  toggleAppHome?: (dappName: string) => any
}

export class AppCard extends React.Component<AppCardProps>  {
  constructor(props: AppCardProps) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
  }

  private getCategories(): JSX.Element {
    const { dapp } = this.props;
    const items = dapp.categories.map((item, index): JSX.Element => (
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
  public render() {
    const { dapp, toggleAppHome } = this.props;
    return (
      <div className="app-card" onClick={() => toggleAppHome(dapp.appName)}>
        <div className="header" style={{ backgroundImage: `url('${dapp.preview}')` }}>
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
