// Styles Injection
import "normalize.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import "rc-dropdown/assets/index.css"
import "./assets/styles/main.sass"

// Set Bluebird as default Promise handler 
import * as Promise from "bluebird"
global.Promise = Promise

// Other
import { configureStore } from "app/store"
// import { createBrowserHistory } from "history"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import { ConnectedRouter } from "react-router-redux"
import { App } from "app"

// prepare store
// export const history = createBrowserHistory()
export const store = configureStore() // history

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
      <App />
    {/* </ConnectedRouter> */}
  </Provider>,
  document.getElementById("root"),
)
