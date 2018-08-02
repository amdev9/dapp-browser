/*eslint-disable no-unused-vars*/
import React, { Component } from 'react'
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

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = { activeDapp: undefined };

  
    // this.action = this.action.bind(this)
    this.onClickTodo = this.onClickTodo.bind(this);
  }
  
  // const action = (type, value) => ()   => {
  //   console.log('TYPE', type);
  //   value ? dispatch({type, value}) : dispatch({type})
  // }

  onClickTodo(dappName) {
    this.setState({
      activeDapp: dappName
    });
    // dispatch(switchDapp('dappname128729index')) // pass as a param
  }

  render() {
   
    return (
      <div>
        <br />
        <br />
        {/* create component navigate between dapps */}
        <button onClick={onClickTodo}>BV1</button> 
        {' '}
        <button onClick={onClickTodo}>BV2</button> 
        {/* <br />
          <br />
          {' '}
          Clicked: { counter} times
          {' '}
          <button onClick={action(INCREMENT_COUNTER)}>+</button>
          
          {' '}
          <button onClick={action(DECREMENT_COUNTER)}>-</button>
          {' '}
          
          {' '}
          <button
            onClick={countdown ? action(CANCEL_INCREMENT_ASYNC) : action(START_COUNTDOWN)}
            style={{color: countdown ? 'red' : 'black'}}>
            {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
          </button> */}
      </div>



    )
  }
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