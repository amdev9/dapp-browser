import { createSelector } from 'reselect';
import { IState } from '../../helpers/reducers/state';

export const activeDappSelector = createSelector(
  (state: IState) => state.client.activeDapp,
  activeDapp => activeDapp && activeDapp.appName,
);
