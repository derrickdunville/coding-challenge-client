import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import linkReducer from './linkReducer'

export default combineReducers({
  links: linkReducer,
  form: formReducer.plugin({
    link: (state, action) => { // <------ 'link' is name of form given to reduxForm()
      switch(action.type) {
        case "POST_LINK_SUCCESS":
          return undefined;       // <--- blow away form data
        case "POST_LINK_FAIL":
          return{
            ...state,
            asyncErrors: {title: action.payload.err.message} //<-- kind of a hack, but works
          }
        default:
          return state;
      }
    },
    editLink: (state, action) => {
      switch(action.type) {
        case "PUT_LINK_FAIL":
          return{
            ...state,
            asyncErrors: {title: action.payload.err.message} //<-- kind of a hack, but works
          }
        default:
          return state;
      }
    }
  })
})
