import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import logo from "assets/img/ambassador.png";
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/views/homeStyle.jsx"
import queryString from 'query-string'

import { getLinks } from '../actions/linkActions'

class LinkPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // get the link. we'll pass history to the action. if the action return 404 we will show page not found
  }

  head(){
    return (
      <Helmet key={this.props.location} title={"Ambassador Code Challenge!"} meta={[
          {name: "description", content: "This website was made by Derrick Dunville to solve an inteview coding challange for Ambassador."}
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div style={{width: "100%", display: "flex", justifyContent: "center", textAlign: "center"}}>
        {this.head()}
        <div>
          <h1>are awesome!</h1>
          <h2>Come join Tim's World Wide Web!</h2>
          <img src={logo}/>
          <h1>Ambassador</h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function loadData(store, match, query, url, referring_url){
  console.log("link page load data: ", query)
  console.dir(query)
  // return store.dispatch(getLinks())
}

export default {
  loadData,
  component: connect(mapStateToProps, { getLinks })(withRouter(withStyles(homeStyle)(LinkPage)))
}
