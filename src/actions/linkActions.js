import * as types from '../constants/link-action-types'

export const postLink = (link) => async (dispatch, getState, api) =>{
  dispatch({ type: types.POST_LINK })
  try {
    const res = await api.post('/links', link)
    dispatch({ type: types.POST_LINK_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.POST_LINK_FAIL, payload: error.response })
  }
}

export const getLinks = () => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_LINKS
  })
  try {
    const res = await api.get('/links')
    dispatch({
      type: types.GET_LINKS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_LINKS_FAIL,
       payload: error.response
     })
  }
}

export const getLink = (title) => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_LINK
  })
  try {
    const res = await api.get(`/links/${title}`)
    dispatch({
      type: types.GET_LINK_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_LINK_FAIL,
       payload: error.response
     })
  }
}

export const clearLink = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_LINK })
}
