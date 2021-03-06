import { combineReducers } from "redux"

import hydratation from "./modules/hydratation"
import router from "./modules/router"

import authentication from "./modules/authentication"
import alert from "./modules/alert"
import questions from "./modules/questions"

const reducer = combineReducers({
  hydratation,
  router,
  authentication,
  alert,
  questions,
})

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    const { hydratation } = state
    state = { hydratation }
  }
  return reducer(state, action)
}

export default rootReducer
