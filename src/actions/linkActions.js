import * as types from '../constants/link-action-types'

export const postLink = (link) => async (dispatch, getState, api) =>{
  dispatch({ type: types.POST_LINK })
  try {
    const res = await api.post('/links', link)
    dispatch({
      type: types.POST_LINK_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.POST_LINK_FAIL,
      payload: error.response.data
    })
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
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_LINKS_FAIL,
      payload: error.response.data
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
      payload: res.data
    })
    const click_res = await api.post('/click/' + title)
  } catch (error) {
    dispatch({
      type: types.GET_LINK_FAIL,
      payload: error.response.data
     })
  }
}

export const clearLink = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_LINK })
}

export const toggleEditOpen = () => async (dispatch, getState, api) => {
  dispatch({type: types.TOGGLE_EDIT_OPEN})
}

export const putLink = (title, newTitle) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_LINK
  })
  try {
    const res = await api.put(`/links/${title}`, {title: newTitle})
    dispatch({
      type: types.PUT_LINK_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.PUT_LINK_FAIL,
      payload: error.response.data
     })
  }
}

export const deleteLink = (title) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_LINK
  })
  try {
    const res = await api.delete(`/links/${title}`)
    dispatch({
      type: types.DELETE_LINK_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_LINK_FAIL,
      payload: error.response.data
     })
  }
}
