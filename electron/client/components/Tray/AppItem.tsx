import * as React from "react"
 

import { AppItem as AppItemModel } from '../../redux/model';

import './react-contextmenu.css';

interface AppsItemProps {
  item?: AppItemModel,
  clickItem?: () => void
}

interface ClickObj {
  foo: string
}

export class AppItem extends React.Component<AppsItemProps> { 
  
  constructor(props: AppsItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick(e: Event, typeClick: ClickObj) {
    console.log('clicked');
  }

  public render() {
    const { item, clickItem } = this.props
    
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
