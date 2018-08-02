import { connect } from "react-redux"
import * as React from "react"
import { RootState } from "app/reducers"
import { Suggests } from "./Suggests"

// Assets
const searchIcon = require("../../../../assets/icons/search.svg")
const closeIcon = require("../../../../assets/icons/close.svg")

export namespace SuggestSearch {
  export interface Props {

  }

  export interface State {
    isOpen: boolean
  }
}

@connect((state: RootState): any => {
  return {
    // ... some data
  }
})

export class SuggestSearch extends React.Component<SuggestSearch.Props, SuggestSearch.State> {
  constructor(props: SuggestSearch.Props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  public state: SuggestSearch.State = {
    isOpen: false,
  }

  private toggle() {
    const { isOpen } = this.state

    // Hide or show title in headerbar by searchbar status
    const title = document.querySelector(".headerbar .title") as HTMLElement
    if (title) {
      const willOpen = !isOpen
      if (willOpen) {
        title.style.setProperty("--headerbar-title-display", "none")
      } else {
        title.style.setProperty("--headerbar-title-display", "block")
      }
    }

    // Toggle And clear
    this.setState({
      isOpen: !isOpen,
    })
  }

  public render() {
    const { isOpen } = this.state
    const actionIcon = isOpen ? closeIcon : searchIcon
    const visibleClass = isOpen ? "showed" : "hidden"

    return (
      <div className="search">
        <div className={`search-content ${visibleClass}`}>
          <div className="title">
            URI:
          </div>
          <Suggests />
        </div>
        <div className="action" onClick={this.toggle}>
          <img className={visibleClass} src={actionIcon} />
        </div>
      </div>
    )
  }
}
