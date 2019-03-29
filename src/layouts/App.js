import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  componentDidUpdate(prevProps, prevState){

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

function mapStateToProps(state){
  return {
  }
}

function loadData(store){
  return
}

export default {
  component: connect(mapStateToProps, { })(App),
  loadData
}
