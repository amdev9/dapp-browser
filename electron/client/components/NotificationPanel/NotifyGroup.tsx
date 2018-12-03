import * as React from 'react';
import { Notify as Item } from './Notify';
import { NotifyItem } from '../../redux/model';
import { IoMdClose } from 'react-icons/io';

interface NotifyGroupProps {
  clearNotification?: (id: number) => void,
  clearAllNotifications?: () => void,
  onClickNotification: (actionUid: string, dappName: string) => void,
  items: NotifyItem[]
}

export class NotifyGroup extends React.Component<NotifyGroupProps> {
  constructor(props: NotifyGroupProps) {
    super(props);
    this.getList = this.getList.bind(this);
  }

  private getList(): JSX.Element[] | null {
    const { items, clearNotification } = this.props;

    if (items) {
      return items.sort((a, b) => {
        if (a.created > b.created) {
          return -1;
        }

        if (a.created < b.created) {
          return 1;
        }

        return 0;
      }).map((item) => (
        <Item
          key={item.id}
          item={item}
          onClickNotification={() => {
            this.props.clearNotification(item.id);
            this.props.onClickNotification(item.onClick, item.appName);
          }}
        />
      ));
    } else {
      return null;
    }
  }

  public render() {
    const groupTimeLabel = "";
    const { clearAllNotifications } = this.props;
    return (
      <div className="group">
        <div className="title">
          <span>{groupTimeLabel}</span>
          <div className="clear" onClick={() => clearAllNotifications()}>
            <IoMdClose fontSize="14px" color="#A8B2BD"/>
          </div>
        </div>
        <div className="items">
          {this.getList()}
        </div>
      </div>
    );
  }
}
