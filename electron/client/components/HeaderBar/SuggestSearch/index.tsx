import * as React from "react";
import { Suggests } from "./suggests";
import {SearchItem} from "../../../redux/model";

// Assets
const searchIcon = require("../../../assets/icons/search.svg");

export interface SuggestSearchProps {
  searchItems: { [index: string]: SearchItem[] }
  isOpen: boolean
  togglePanel(openStatus?: boolean): void
  isStatusBarOpen: boolean
  toggleStatusBar(openStatus: boolean): void
  isPeersBarOpen: boolean
  togglePeersBar(openStatus: boolean): void
}

export interface SuggestSearchState {
  isOpen: boolean
}

export class SuggestSearch extends React.Component<SuggestSearchProps, SuggestSearchState> {

  public render() {
    const { searchItems, togglePanel, toggleStatusBar, isStatusBarOpen, isPeersBarOpen, togglePeersBar} = this.props;

    return (
      <div className="search">
        <div className={`search-content`}>
          <div className="title">
            URI:
          </div>
          <Suggests
            searchItems={searchItems}
            togglePanel={togglePanel}
            isStatusBarOpen={isStatusBarOpen}
            toggleStatusBar={toggleStatusBar}
            isPeersBarOpen={isPeersBarOpen}
            togglePeersBar={togglePeersBar}
          />
        </div>
        <div className="action">
          <img src={searchIcon} />
        </div>
      </div>
    )
  }
}
