import {
  POST_LINK,
  POST_LINK_FAIL,
  POST_LINK_SUCCESS,
  GET_LINKS,
  GET_LINKS_SUCCESS,
  GET_LINKS_FAIL
} from '../constants/link-action-types'

const initialState = {
  loaded: false,
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
        postingLink: false,
        postLinkErrorMessage: action.payload.data.err.message
      }
    case GET_LINKS:
      return {
        ...state,
        gettingLinks: true,
      }
    case GET_LINKS_SUCCESS:
      return {
        ...state,
        gettingLinks:false,
        loaded: true,
        docs: action.payload.data
      }
    case GET_LINKS_FAIL:
      return {
        ...state,
        gettingLinks: false,
        loaded: true
      }
    default:
      return state
  }
}
