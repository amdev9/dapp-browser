import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as React from "react";
// import * as _ from "lodash";
import * as Autocomplete from "react-autocomplete";
// import { SuggestItem } from "../../../redux/model";
// import { RootState } from "../../../redux/reducers";

// import { getKey } from "app/utils"



export namespace Suggests {
  export interface Props {
    items?: RootState.Search
  }

  export interface State {
    value: string
  }
}

const mapStateToProps = (state: RootState): { items: RootState.Search } => {
  return {
    items: state.search,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({

}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export class Suggests extends React.Component<Suggests.Props, Suggests.State> {
  constructor(props: Suggests.Props) {
    super(props)

    this.getItemValue = this.getItemValue.bind(this)
    this.getItems = this.getItems.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getItem = this.getItem.bind(this)
    this.getMenu = this.getMenu.bind(this)
  }

  public state: Suggests.State = {
    value: "",
  }

  private getItems(): SuggestItem[] {
    let { items } = this.props
    items = items ? items : {}

    const result = _(items).map((groupItems, groupName): SuggestItem[] => {
      const suggestHeader: SuggestItem = {
        type: SuggestItem.Type.Header,
        header: groupName,
      }

      const suggestItems: SuggestItem[] = _(groupItems).map((item) => ({
        type: SuggestItem.Type.Item,
        item,
      })).value()

      return [
        suggestHeader,
        ...suggestItems,
      ]
    }).flatten().value()

    return result
  }

  private onSelect(value: string, suggestItem: SuggestItem) {
    this.setState({
      value,
    })
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>, value: string) {
    this.setState({
      value,
    })
  }

  private getItem(suggestItem: SuggestItem, isHighlighted: boolean): JSX.Element {
    const key = `${suggestItem.type}-${getKey()}`
    const activeClass = isHighlighted ? "active" : ""

    switch (+suggestItem.type) {
      case SuggestItem.Type.Header: {
        const header = suggestItem.header ? suggestItem.header : ""
        return (
          <div key={key} className="item header">
            <span>{header}</span>
          </div>
        )
      }

      case SuggestItem.Type.Item: {
        if (!suggestItem.item) {
          return <div key={key} />
        } else {
          const { item } = suggestItem

          return (
            <div key={key} className={`item suggest ${activeClass}`}>
              <div className="icon">
                <img src={item.icon} />
              </div>
              <div className="app">
                {item.app}
              </div>
              <div className="uri">
                {item.uri}
              </div>
              <div className="network">
                {item.network}
              </div>
            </div>
          )
        }
      }

      default: return <div key={key} />
    }
  }

  private getMenu(items: JSX.Element[], value: string): JSX.Element | JSX.Element[] {
    if (value === "") {
      return (
        <div className="menu">
          <div className="empty">
            Please enter your request
          </div>
        </div>
      )
    } else {
      return (
        <div className="menu">
          {items}
        </div>
      )
    }
  }

  private getItemValue(suggestItem: SuggestItem): string {
    const { item } = suggestItem
    return item ? item.uri : ""
  }

  public render() {
    const { value } = this.state

    const styles: React.CSSProperties = {
      display: "inline-block",
      overflowX: "hidden",
      flex: 1,
    }

    const props: Autocomplete.Props = {
      isItemSelectable: (suggestItem) => (suggestItem.type !== SuggestItem.Type.Header),
      getItemValue: this.getItemValue,
      renderItem: this.getItem,
      renderMenu: this.getMenu,
      onSelect: this.onSelect,
      onChange: this.onChange,
      items: this.getItems(),
      wrapperStyle: styles,
      value,
    }

    return (
      <Autocomplete {...props} />
    )
  }
}
