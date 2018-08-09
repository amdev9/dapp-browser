import * as React from "react"
import { AppBox } from './AppBox'; 
 
const iconChat = require("../../assets/app-icons/chat.svg");
const iconShare = require("../../assets/app-icons/share.svg");

export class AppsList extends React.Component { 
  render() {
    return (
      <div className="list">
        <AppBox icon={iconChat} name={'iconChat'} />
        <AppBox icon={iconShare} name={'iconShare'} />
      </div>
    )
  }
}




