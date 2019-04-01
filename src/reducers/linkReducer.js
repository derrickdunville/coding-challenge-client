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
  CLEAR_LINK,
  PUT_LINK,
  PUT_LINK_SUCCESS,
  PUT_LINK_FAIL,
  DELETE_LINK,
  DELETE_LINK_SUCCESS,
  DELETE_LINK_FAIL
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
        docs: [action.payload, ...state.docs]
      }
    case POST_LINK_FAIL:
      return {
        ...state,
        postingLink: false,
        postLinkErrorMessage: action.payload.err.message
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
        docs: action.payload
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
        link: action.payload
      }
    case GET_LINK_FAIL:
      return {
        ...state,
        gettingLink: false,
        getLinkErrorMessage: action.payload.err.message,
        linkStatus: action.payload.status
      }
    case CLEAR_LINK:
      let newState = {...state}
      delete newState.link
      delete newState.linkStatus
      delete newState.getLinkErrorMessage
      return newState
    case PUT_LINK:
      return {
        ...state,
        puttingLink: true
      }
    case PUT_LINK_SUCCESS:
      return {
        ...state,
        puttingLink: false,
        docs: state.docs.map(link => (link._id === action.payload._id) ? action.payload : link)
      }
    case PUT_LINK_FAIL:
      return {
        ...state,
        puttingLink: false
      }
    case DELETE_LINK:
      return {
        ...state,
        deletingLink: true
      }
    case DELETE_LINK_SUCCESS:
      return {
        ...state,
        deletingLink: false,
        docs: deleteLinkFromDocs(state.docs, action.payload)
      }
    case DELETE_LINK_FAIL:
      return {
        ...state,
        deletingLink: false
      }
    default:
      return state
  }
}

function deleteLinkFromDocs(docs, payload){
  let target_index = -1
  for(let i = 0; i < docs.length; ++i){
    if(docs[i].title == payload.title){
      target_index = i
      break
    }
  }
  if(target_index > -1){
    return ([...docs.slice(0, target_index), ...docs.slice(target_index + 1)])
  } else {
    return ([...docs])
  }
}
