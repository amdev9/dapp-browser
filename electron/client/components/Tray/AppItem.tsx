import * as React from "react"
import * as path from 'path';
 
const icon = require("../../assets/app-icons/chat.svg")

export class AppItem extends React.Component { 
  
  public render() {
    return (
      <div className="tray item">
        <div className="icon">
          <img src={icon} alt={'test icon'} />
        </div>
      </div>
    )
  }
}
