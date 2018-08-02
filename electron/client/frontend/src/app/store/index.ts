import { logger } from "app/middleware"
import { rootReducer, RootState } from "app/reducers"
// import { History } from "history"
// import { routerMiddleware } from "react-router-redux"
import { applyMiddleware, createStore, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { initHardcodeState } from "app/hardcode"

// history: History, 
export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger)  // routerMiddleware(history)

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>

  if (module.hot) {
    module.hot.accept("app/reducers", () => {
      const nextReducer = require("app/reducers")
      store.replaceReducer(nextReducer)
    })
  }

  // Init Hardcode store for development
  if (process.env.NODE_ENV !== "production") {
    initHardcodeState(store.dispatch)
  }

  return store
}
