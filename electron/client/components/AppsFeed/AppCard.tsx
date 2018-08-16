
import * as React from "react"
// import { MoonLoader } from "react-spinners"
 
// export namespace AppCard {
//   export enum ActionStatus {
//     Install,
//     Update,
//   }
//   export enum TargetAction {
//     Install,
//     Update,
//     Launch,
//   }
//   export enum Size {
//     Default,
//     Small,
//   }
//   export interface Props {
//     action: TargetAction
//     size: Size
//     dapp: DApp
//   }
//   export interface State {
//     status: Option<ActionStatus>
//   }
// }

 

type DApp = {
  // Dapp name
  name: string
  // Preview image (for card on marketplace)
  preview: string
  // icon (eg for tray)
  icon: string
  // Categories
  categories: string[]
}

interface AppCardProps {
  dapp: DApp
}

export class AppCard extends React.Component<AppCardProps>  {
  constructor(props: AppCardProps) {
    super(props)
 
    this.getCategories = this.getCategories.bind(this)
    // this.actionHandle = this.actionHandle.bind(this)
 
  }

  // public state: AppCard.State = {
  //   status: None,
  // }

  // private async actionHandle() {
  //   // @TODO: add functionaly cb wrapper here\
  //   this.setState({
  //     status: Some(AppCard.ActionStatus.Update),
  //   })
  // }

   

  private getCategories(): JSX.Element {
    const { categories } = this.props.dapp

    const items = categories.map((item, index): JSX.Element => (
      <div key={`tag-${index}`} className="tag">
        <span>{item}</span>
      </div>
    ))
    return (
      <div className="tags">
        {items}
      </div>
    )
  }
  public render() {
    const { dapp } = this.props;
    return (
      <div className="app-card">
        <div className="header" style={{ backgroundImage: `url('${dapp.preview}')` }}> 
        {/*  */}

          {/* @TODO: add addittional network tags */
 
          }
        </div>
        <div className="content">
          <div className="title">{dapp.name}</div>
          <div className="footer">
            {this.getCategories()}
             
          </div>
        </div>
      </div>
    )
  }
}
