import React from 'react'
import App from '../layouts/App'
import NotFoundPage from '../views/NotFoundPage'
import HomePage from '../views/HomePage'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        hidden: true,
        path: '/',
      },
      {
        ...NotFoundPage,
        path: '',
      }
    ]
  }
]
