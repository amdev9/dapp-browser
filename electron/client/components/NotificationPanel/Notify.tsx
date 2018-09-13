import * as React from 'react';
import * as moment from 'moment';

import { NotifyItem } from '../../redux/model';

interface NotifyProps {
  item: NotifyItem,
  clearNotification?: (id: number) => void
}

export class Notify extends React.Component<NotifyProps> {

  public render() {
    const { clearNotification, item } = this.props;
    const created = moment(item.created)

    const timeLabel = created.isSame(moment(), "day")
      ? created.fromNow()
      : created.format("DD.MM.YY")

    return (
      <div className="item" onClick={() => clearNotification(item.id)}>
        <div className="title">
          <img src={item.icon} />
          <span className="app">{item.appName}</span>
          <span className="time">{timeLabel}</span>
        </div>
        <div className="content">
          {item.message}
        </div>
      </div>
    )
  }
}
