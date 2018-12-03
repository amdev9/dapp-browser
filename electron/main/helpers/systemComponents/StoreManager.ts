import { Store } from 'redux';
import { IState } from '../reducers/state';

export default class StoreManager {
  static store: Store<IState>;

}
