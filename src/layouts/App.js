import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import favicon from '../assets/img/favicon.ico'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { route, ...rest } = this.props;
    return (
      <div>
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

export default {component: App}
