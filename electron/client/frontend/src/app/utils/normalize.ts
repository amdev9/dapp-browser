import { NotifyItem } from "app/models"
import * as moment from "moment"
import * as _ from "lodash"

export const getKey = (): string => Math.random().toString(36).substring(7)
export type NormalizedNotify = _.Dictionary<NotifyItem[]>

export const normalizeNotifications = (items: NotifyItem[]): NormalizedNotify => {
  const sorted = items.sort((a, b) => (b.created.getTime() - a.created.getTime()))

  const result = _(sorted)
    .groupBy((item) => moment(item.created).startOf("day"))
    .value()
  return result
} 
