// src/__mocks__/axios.js

// or if you wanna cover for the 'create' method too
const mockAxios = {
  get: jest.fn(() => Promise.resolve({data: {}})),
  post: jest.fn(() => Promise.resolve({data: {}})),
  put: jest.fn(() => Promise.resolve({data: {}})),
  delete: jest.fn(() => Promise.resolve({data: {}})),
}
mockAxios.create = jest.fn(() => mockAxios)
export default mockAxios
