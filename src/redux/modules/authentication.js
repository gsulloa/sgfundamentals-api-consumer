import { push } from "react-router-redux"
import { newErrorAlert } from "./alert"
import { doFetch } from "./fetching"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

const initialState = {
  fetching: false,
  isAuthenticated: false,
  data: {},
}
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isAuthenticated: true,
        token: action.token,
      }
    case "LOGIN_FETCH_START":
      return {
        ...state,
        fetching: true,
      }
    case "LOGIN_FETCH_END":
      return {
        ...state,
        fetching: false,
      }
    default:
      return state
  }
}
/*
   api Fetchs
 */
function login(api, body) {
  return api.post("/session", body)
}
/*
  before Actions
*/
export function loginUser(creds) {
  return async (dispatch, getState, api) => {
    const response = await doFetch(dispatch, login(api.api, creds), "LOGIN")
    if (response.error) {
      dispatch(newErrorAlert("Error en ingreso", response.data.response.data))
    } else {
      const data = response.token.substr(7).split(".")
      const userInfo = JSON.parse(atob(data[1]))
      dispatch(
        receiveLogin(
          {
            userId: userInfo.userId,
            role: "user",
          },
          response.token.substr(7)
        )
      )
      dispatch(push("/"))
    }
  }
}

export function logoutUser() {
  return async dispatch => {
    // dispatch(receiveLogout())
    dispatch({ type: "CLEAR_STORE" })
    dispatch(push("/login"))
  }
}

function receiveLogin(data, token) {
  return {
    type: LOGIN_SUCCESS,
    data,
    token,
  }
}
