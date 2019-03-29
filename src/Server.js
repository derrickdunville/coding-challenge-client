import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticRouter, Router, Route, Switch } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import Routes from './routes/app'

import "assets/css/styles.css";

class Server extends Component {

  render(){
    return (
      <StaticRouter location={this.props.location} context={this.props.context}>
          <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    )
  }
}

export default Server;
