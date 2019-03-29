import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'
import linkReducer from './linkReducer'

export default combineReducers({
  app: appReducer,
  links: linkReducer
})
