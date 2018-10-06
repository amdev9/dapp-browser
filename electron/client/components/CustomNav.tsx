import * as React from "react"
import { withRouter } from 'react-router-dom';

const CustomNav = ({to, location, history, children}: any) => {
    return (
      <span onClick={() => (history.push(to))}>
        {children}
      </span>
    );
  }

  export default withRouter(CustomNav)