import { createSelector } from 'reselect';
import { IState } from '../reducers/state';

export const activeDappSelector = createSelector(
  (state: IState) => state.client.activeDapp,
  activeDapp => activeDapp && activeDapp.appName,
);
