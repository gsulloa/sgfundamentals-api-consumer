import { doFetch } from "./fetching"
import { newErrorAlert } from "./alert"

const SET_QUESTIONS = "SET_QUESTIONS"
const SET_QUESTION = "SET_QUESTION"
const type = "QUESTION"
const initialState = {
  data: [],
  fetching: false,
}
export default function questions(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        data: action.payload.data,
      }
    case SET_QUESTION: {
      const index = state.data.findIndex(e => e.id === action.payload.id)
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          action.payload,
          ...state.data.slice(index + 1),
        ],
      }
    }
    case `${type}_FETCH_START`:
      return {
        ...state,
        fetching: true,
      }
    case `${type}_FETC_END`:
      return {
        ...state,
        fetching: false,
      }
    default:
      return state
  }
}
function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    payload: {
      data: questions.map(q => q.attributes),
    },
  }
}
function setQuestion(question) {
  return {
    type: SET_QUESTION,
    payload: {
      ...question.attributes,
    },
  }
}

function fetchQuestions(api) {
  return api.get("/questions")
}
function fetchQuestion(api, id) {
  return api.get(`/questions/${id}`)
}

export function getQuestions() {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchQuestions(api.api.withToken(getState().authentication.token)),
      type
    )
    if (response.error) {
      dispatch(newErrorAlert("Error al obtener las preguntas"))
    } else {
      dispatch(setQuestions(response.data))
    }
  }
}

export function getQuestion(id) {
  return async (dispatch, getState, api) => {
    const response = await doFetch(
      dispatch,
      fetchQuestion(api.api.withToken(getState().authentication.token), id),
      type
    )
    if (response.error) {
      dispatch(newErrorAlert("Error al obtener la preguntas"))
    } else {
      dispatch(setQuestion(response.data))
    }
  }
}
