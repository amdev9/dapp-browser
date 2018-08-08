import * as React from "react"
import * as path from 'path';
 

interface AppsItemProps {
  icon: string,
  name: string
}

export class AppItem extends React.Component<AppsItemProps> { 
  
  public render() {
    const { icon, name } = this.props
    return (
      <div className="tray item">
        <div className="icon">
          <img src={icon} alt={name} />
        </div>
      </div>
    )
  }
}
