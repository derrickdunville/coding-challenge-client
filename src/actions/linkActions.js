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
