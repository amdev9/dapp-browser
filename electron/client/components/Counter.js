/*eslint-disable no-unused-vars*/
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { 
  increment,

  INCREMENT_COUNTER, 
  DECREMENT_COUNTER,
  START_COUNTDOWN,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED 
} from '../redux/actions/counter';

import { 
  switchDapp,
  SWITCH_DAPP, 
  SEND_PING_MESSAGE
} from '../redux/actions/client';


function Counter({counter, countdown, congratulate, dispatch}) {
  const action = (type, value) => () => {
    value ? dispatch({type, value}) : dispatch({type})
  };

  const onClickTodo = () => {
    dispatch(switchDapp('dappname128729index'))
  };

  return (
    <div>
      {' '}
      <button onClick={onClickTodo}>BV1</button> 
      <button onClick={onClickTodo}>BV2</button> 
      {/* create component */}

      {' '}
      Clicked: {counter} times
      {' '}
      <button onClick={action(INCREMENT_COUNTER)}>+</button>
      {/* action(INCREMENT_COUNTER) */}
      {' '}
      <button onClick={action(DECREMENT_COUNTER)}>-</button>
      {' '}
      {/* <button onClick={action(INCREMENT_IF_ODD)}>Increment if odd</button> */}
      {' '}
      <button
        onClick={countdown ? action(CANCEL_INCREMENT_ASYNC) : action(START_COUNTDOWN)}
        style={{color: countdown ? 'red' : 'black'}}>

        {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
      </button>
    </div>
  )
}

Counter.propTypes = {
  // dispatch actions
  dispatch: PropTypes.func.isRequired,
  // state
  counter: PropTypes.number.isRequired,
  countdown: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    countdown: state.countdown
  }
}

export default connect(mapStateToProps)(Counter);