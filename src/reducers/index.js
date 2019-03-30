import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import linkReducer from './linkReducer'

export default combineReducers({
  links: linkReducer
})
