const NEW_ALERT = "NEW_ALERT"
const CLOSE_ALERT = "CLOSE_ALERT"

export default function alert(state = [], action) {
  switch (action.type) {
    case NEW_ALERT:
      return [...state, action.data]
    case CLOSE_ALERT:
      return [...state.slice(0, action.i), ...state.slice(action.i + 1)]
    default:
      //return []; // Al hacer cualquier acción sin alerta, las elimina todas
      return state
  }
}

export function closeAlert(i) {
  return {
    type: CLOSE_ALERT,
    i,
  }
}
export function newErrorAlert(title, body) {
  return {
    type: NEW_ALERT,
    data: {
      title,
      body,
      type: "error",
    },
  }
}
export function newSuccessAlert(title, body) {
  return {
    type: NEW_ALERT,
    data: {
      title,
      body,
      type: "success",
    },
  }
}
