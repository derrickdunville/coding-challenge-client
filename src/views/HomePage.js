import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import logo from "assets/img/reactlogo.png";
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/views/homeStyle.jsx"
import queryString from 'query-string'

import LinkForm from '../components/LinkForm.jsx'
import LinkTable from '../components/LinkTable.jsx'
import { getLinks } from '../actions/linkActions'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(!this.props.links.loaded){
      this.props.getLinks()
    }
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
        <div style={{width: "100%", display: "flex", justifyContent: "center", textAlign: "center"}}>
          <h1>Grow the web with referrals!</h1>
        </div>
        <LinkForm />
        <LinkTable data={this.props.links.docs || []}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    links: state.links
  }
}

function loadData(store, match, query, url, referring_url){
  console.log("home page load data: ", query)
  console.dir(query)
  return store.dispatch(getLinks())
}

export default {
  loadData,
  component: connect(mapStateToProps, { getLinks })(withRouter(withStyles(homeStyle)(Home)))
}
