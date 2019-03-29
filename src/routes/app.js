import React from 'react'
import App from '../layouts/App'

import HomePage from '../views/HomePage'
import LinkPage from '../views/LinkPage.jsx'
import NotFoundPage from '../views/NotFoundPage'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        exact: true,
        path: '/',
      },
      {
        ...LinkPage,
        path: '/:title'
      },
      {
        ...NotFoundPage,
        path: '',
      }
    ]
  }
]
