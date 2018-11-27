import * as React from 'react';
import { Provider } from 'react-redux';

import Game from './Game';

export default function () {
  return (
    <div>
      <div>
        <Game/>
      </div>
      <div>
        <Game/>
      </div>
    </div>
  )
}
