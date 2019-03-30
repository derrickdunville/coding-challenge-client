import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers'
import axios from 'axios'

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://127.0.0.1:3001',
    withCredentials: true
  })
  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
  return store;
};
