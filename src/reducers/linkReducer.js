import {
  POST_LINK,
  POST_LINK_FAIL,
  POST_LINK_SUCCESS,
  GET_LINKS,
  GET_LINKS_SUCCESS,
  GET_LINKS_FAIL,
  GET_LINK,
  GET_LINK_SUCCESS,
  GET_LINK_FAIL,
  CLEAR_LINK
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
    case GET_LINK:
      return {
        ...state,
        gettingLink: true,
      }
    case GET_LINK_SUCCESS:
      return {
        ...state,
        gettingLink:false,
        loaded: true,
        link: action.payload.data
      }
    case GET_LINK_FAIL:
      return {
        ...state,
        gettingLink: false,
        loaded: true,
        getLinkErrorMessage: action.payload.data.err.message,
        linkStatus: action.payload.status
      }
    case CLEAR_LINK:
      let newState = {...state}
      delete newState.link
      delete newState.linkStatus
      delete newState.getLinkErrorMessage
      return newState
    default:
      return state
  }
}
