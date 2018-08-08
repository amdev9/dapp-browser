import * as React from "react"
import { AppItem } from './AppItem';

interface AppBoxProps {
  icon: string,
  name: string
}

export class AppBox extends React.Component<AppBoxProps> { 
  public render() {
    return (
      <AppItem {...this.props}/>
    )
  }
}
