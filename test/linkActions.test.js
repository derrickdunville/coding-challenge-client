/**
 * @jest-environment node
 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/actions/linkActions'
import * as types from '../src/constants/link-action-types'
import mockAxios from 'axios'
import expect from 'expect'

const middlewares = [thunk.withExtraArgument(mockAxios)]
const mockStore = configureMockStore(middlewares)
const mockData =
  [
    {
      "clicks": 4,
      "id": "5ca0a2198b782f09b2cabb0e",
      "title": "example"
    }
  ]

describe('async linkActions', () => {
  var store = null
  beforeEach(() => {
    store = mockStore(
      {
        links: {
          loaded: false,
          docs: []
        }
      }
    )
  })

  // getLinks() list
  it('getLinks()', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({data: mockData })
    )
    const expectedActions = [
      { type: types.GET_LINKS },
      { type: types.GET_LINKS_SUCCESS, payload: mockData }
    ]
    return store.dispatch(actions.getLinks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // getLink(title)
  it('getLink(title)', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({data: mockData[0] })
    )
    const expectedActions = [
      { type: types.GET_LINK },
      { type: types.GET_LINK_SUCCESS, payload: mockData[0] }
    ]
    return store.dispatch(actions.getLink(mockData[0].title)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // postLink(title)
  it('postLink(title)', () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({data: mockData[0]})
    )
    const expectedActions = [
      { type: types.POST_LINK },
      { type: types.POST_LINK_SUCCESS, payload: mockData[0] }
    ]
    return store.dispatch(actions.postLink({title: mockData[0].title})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // putLink(title, newTitle)
  it('putLink(title, newTitle) success', () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({data: mockData[0]})
    )
    const expectedActions = [
      { type: types.PUT_LINK },
      { type: types.PUT_LINK_SUCCESS, payload: mockData[0] }
    ]
    return store.dispatch(actions.putLink(mockData[0].title, mockData[0].title)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // deleteLink(title)
  it('deleteLink(title) success', () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({data: { message: "link successfully deleted" } })
    )
    const expectedActions = [
      { type: types.DELETE_LINK },
      { type: types.DELETE_LINK_SUCCESS, payload: { message: "link successfully deleted" } }
    ]
    return store.dispatch(actions.deleteLink(mockData[0].title)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // clearLink()
  it('clearLink() success', () => {
    const expectedActions = [
      { type: types.CLEAR_LINK }
    ]
    return store.dispatch(actions.clearLink()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
