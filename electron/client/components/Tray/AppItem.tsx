import * as React from "react"
import { Line } from "rc-progress"

import { AppItem as AppItemModel } from '../../redux/model';


interface AppsItemProps {
  item?: AppItemModel,
  clickItem?: () => void
}

export class AppItem extends React.Component<AppsItemProps> {

  constructor(props: AppsItemProps) {
    super(props);
  }

  private getIndicator(item: AppItemModel): JSX.Element | null {
    if (!item.indicator) {
      return <div />
    } else {
      return (
        <Line className="progress" percent={item.indicator} />
      )       
    }
  }

  private getActionIndicator(item: AppItemModel): JSX.Element | null {
    const counter = item.counter;
    
    if (counter) {
      return (
        <div className="counter">
          {counter}
        </div>
      )
    } else {
      return null
    }
  }

  public render() {
    const { item, clickItem } = this.props;

    const classNameValue = `tray item ${item.statusIcon.join(' ')}`;
    return (
      <div className={classNameValue}>
        <div className="icon">
          <img src={item.icon} alt={item.appName} onClick={clickItem} />
        </div>
        <div className="process-indicator">
          {this.getIndicator(item)}
        </div>
        
        {this.getActionIndicator(item)}
      </div>
    )
  }
}
