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

describe('link async actions', () => {
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
  const mockData =
    [
      {
        "clicks": 4,
        "id": "5ca0a2198b782f09b2cabb0e",
        "title": "example"
      }
    ]

  // getLinks() list
  it('GET_LINKS_SUCCESS when getting links has been done ', () => {
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
  it('GET_LINK_SUCCESS when getting link has been done ', () => {
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
  it('POST_LINK_SUCCESS when posting a link has been done ', () => {
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
  it('PUT_LINK_SUCCESS when putting a link has been done ', () => {
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
  it('DELETE_LINK_SUCCESS when putting a link has been done ', () => {
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
  it('CLEAR_LINK when clearLink has been done ', () => {
    const expectedActions = [
      { type: types.CLEAR_LINK }
    ]
    return store.dispatch(actions.clearLink()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
