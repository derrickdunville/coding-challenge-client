import {
  POST_LINK,
  POST_LINK_FAIL,
  POST_LINK_SUCCESS
} from '../constants/link-action-types'

const initialState = {
  docs: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case POST_LINK:
      return {
        ...state,
        postingLink: true
      }
    case POST_LINK_SUCCESS:
      return {
        ...state,
        postingLink: false,
        docs: [action.payload.data, ...state.docs]
      }
    case POST_LINK_FAIL:
      return {
        ...state,
        postingLink: false
      }
    default:
      return state
  }
}
