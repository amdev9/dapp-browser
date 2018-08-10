import * as React from "react"
import { AppsList } from './AppsList'; 
 
export class Tray extends React.Component { 
  public render() {
    return (
      <div className="tray">
        <AppsList />
      </div>
    )
  }
}
