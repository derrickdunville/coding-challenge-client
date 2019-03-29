import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import logo from "../assets/img/reactlogo.png";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "../assets/jss/views/homeStyle.jsx";
import queryString from 'query-string'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

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
      <div>
        {this.head()}
        <h1>Welcome</h1>
      </div>
    )
  }
}

function loadData(store, match, query, url, referring_url){
  console.log("home page load data: ", query)
  console.dir(query)
}

export default {
  loadData,
  component: withRouter(withStyles(homeStyle)(Home))
}
