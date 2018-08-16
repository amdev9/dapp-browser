
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

enum Size {
  Default,
  Small,
}

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
  size: Size,
  dapp: DApp
}

export class AppCard extends React.Component<AppCardProps>  {
  constructor(props: AppCardProps) {
    super(props)
 
    this.getCategories = this.getCategories.bind(this)
    // this.actionHandle = this.actionHandle.bind(this)
    this.getAction = this.getAction.bind(this)
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

  private getAction(): JSX.Element {
    // const { status } = this.state
    // const { action } = this.props

    // const actionLabel = ((): string => {
    //   switch (+action) {
    //     case AppCard.TargetAction.Install: return "Install"
    //     case AppCard.TargetAction.Update: return "Update"
    //     case AppCard.TargetAction.Launch: return "Launch"
    //     default: return ""
    //   }
    // })()

    const label = (
      <div className="label">
        Install
      </div>
    )

    // @TODO: next add spinner type by status
    // e.g for updated or install indicator is progress
    // const spinner = (
    //   <div className="loading">
    //     <MoonLoader color="#508dff" size={13} />
    //   </div>
    // )

    const content = label; //status.isDefined() ? spinner : label

    return (
      <div className="action" >
      {/* onClick={this.actionHandle} */}
        {content}
      </div>
    )
  }

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
            {this.getAction()}
          </div>
        </div>
      </div>
    )
  }
}
