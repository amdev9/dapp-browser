import { RootState } from "app/reducers"
import * as React from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"

export namespace Marketplace {
  export interface Props extends RouteComponentProps<void> {

  }

  export interface State {

  }
}

@connect((state: RootState): any => {
  return {
    // ... some data
  }
})

export class Marketplace extends React.Component<Marketplace.Props, Marketplace.State> {
  public state: Marketplace.State = {

  }

  public render() {
    return (
      <div className="Marketplace">

      </div>
    )
  }
}
