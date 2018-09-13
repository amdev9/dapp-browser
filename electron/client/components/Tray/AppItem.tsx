import * as React from "react"


import { AppItem as AppItemModel } from '../../redux/model';


interface AppsItemProps {
  item?: AppItemModel,
  clickItem?: () => void
}

export class AppItem extends React.Component<AppsItemProps> {

  constructor(props: AppsItemProps) {
    super(props);
  }

  public render() {
    const { item, clickItem } = this.props;

    const classNameValue = `tray item ${item.statusIcon.join(' ')}`;
    return (
      <div className={classNameValue}>
        <div className="icon">
          <img src={item.icon} alt={item.appName} onClick={clickItem} />
        </div>
      </div>
    )
  }
}
