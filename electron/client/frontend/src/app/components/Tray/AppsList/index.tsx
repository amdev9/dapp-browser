import { TrayItem } from "app/models"
import * as React from "react"
import * as Sortable from "react-sortable-hoc"
import { SortableAppItem } from "./SortableAppItem"

export namespace AppsList {
  export interface Props {
    itemsType: TrayItem.Type
    axis: "x" | "y" | "xy"
    itemsKeys: string[]
  }
}

export const AppsList = Sortable.SortableContainer((props: AppsList.Props): JSX.Element => {
  const items: JSX.Element[] = props.itemsKeys.map((itemKey, index): JSX.Element => (
    <SortableAppItem
      key={`item-${index}-${itemKey}`}
      collection={props.itemsType}
      itemsType={props.itemsType}
      itemKey={itemKey}
      index={index}
    />
  ))

  return (
    <div className="list">
      {items}
    </div>
  )
})
