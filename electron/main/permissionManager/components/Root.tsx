import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from '../components/App';
import { PermissionLayout } from '../components/PermissionLayout';
import { electronManager } from '../permissions';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
};

export default function Root({ store }: IRootType) {
  return (
    <Provider store={store}> 
      <App>
        <PermissionLayout permissions={electronManager.permissions} />
        {/* //mainAction={electronManager.sendActionMain} */}
      </App>
    </Provider>
  );
}