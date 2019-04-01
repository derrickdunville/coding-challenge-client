/**
 * @jest-environment node
 */
import linkReducer from '../src/reducers/linkReducer'
import * as types from '../src/constants/link-action-types'
import expect from 'expect'

const initialState = {
  loaded: false,
  docs: []
}
const mockData =
  [
    {
      "clicks": 4,
      "id": "5ca0a2198b782f09b2cabb0e",
      "title": "example"
    }
  ]
const loadedState = {
  loaded: true,
  docs: mockData
}
const loadedLinkState = {
  loaded: true,
  docs: mockData,
  link: mockData[0],
}

describe('links reducer', () => {
  it('should return the initial state', () => {
    expect(linkReducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('POST_LINK', () => {
    expect(
      linkReducer(initialState, {
        type: types.POST_LINK
      })
    ).toEqual({
      ...initialState,
      postingLink: true
    })
  })
  it('POST_LINK_SUCCESS', () => {
    expect(
      linkReducer(initialState, {
        type: types.POST_LINK_SUCCESS,
        payload: mockData[0]
      })
    ).toEqual({
      ...initialState,
      postingLink: false,
      docs: [...initialState.docs, mockData[0]]
    })
  })

  it('GET_LINKS', () => {
    expect(
      linkReducer(initialState, {
        type: types.GET_LINKS
      })
    ).toEqual({
      ...initialState,
      gettingLinks: true
    })
  })
  it('GET_LINKS_SUCCESS', () => {
    expect(
      linkReducer(initialState, {
        type: types.GET_LINKS_SUCCESS,
        payload: mockData
      })
    ).toEqual({
      ...initialState,
      loaded: true,
      gettingLinks: false,
      docs: mockData
    })
  })

  it('GET_LINK', () => {
    expect(
      linkReducer(initialState, {
        type: types.GET_LINK
      })
    ).toEqual({
      ...initialState,
      gettingLink: true
    })
  })
  it('GET_LINK_SUCCESS', () => {
    expect(
      linkReducer(initialState, {
        type: types.GET_LINK_SUCCESS,
        payload: mockData[0]
      })
    ).toEqual({
      ...initialState,
      gettingLink: false,
      link: mockData[0]
    })
  })

  it('PUT_LINK', () => {
    expect(
      linkReducer(loadedState, {
        type: types.PUT_LINK
      })
    ).toEqual({
      ...loadedState,
      puttingLink: true
    })
  })
  it('PUT_LINK_SUCCESS', () => {
    expect(
      linkReducer(loadedState, {
        type: types.PUT_LINK_SUCCESS,
        payload: {
          ...mockData[0],
          title: "updated"
        }
      })
    ).toEqual({
      ...loadedState,
      puttingLink: false,
      docs: [...initialState.docs, {
        ...mockData[0],
        title: "updated"
      }]
    })
  })

  it('DELETE_LINK', () => {
    expect(
      linkReducer(loadedState, {
        type: types.DELETE_LINK
      })
    ).toEqual({
      ...loadedState,
      deletingLink: true
    })
  })
  it('DELETE_LINK_SUCCESS', () => {
    expect(
      linkReducer(loadedState, {
        type: types.DELETE_LINK_SUCCESS,
        payload: {
          title: mockData[0].title,
          messsage: "link successfully deleted"
        }
      })
    ).toEqual({
      ...loadedState,
      deletingLink: false,
      docs: []
    })
  })

  it('CLEAR_LINK', () => {
    expect(
      linkReducer(loadedLinkState, {
        type: types.CLEAR_LINK
      })
    ).toEqual({
      ...loadedState
    })
  })
})
