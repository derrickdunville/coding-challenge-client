import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import logo from "assets/img/ambassador.png";
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/views/homeStyle.jsx"
import queryString from 'query-string'
import { getLink, clearLink } from '../actions/linkActions'
import NotFoundPage from '../views/NotFoundPage'

class LinkPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(!this.props.link || this.props.link.title != this.props.match.params.title){
      this.props.getLink(this.props.match.params.title)
    }
  }
  componentWillUnmount(){
    this.props.clearLink()
  }

  head(){
    return (
      <Helmet key={this.props.location} title={this.props.link ? (this.props.link.title.charAt(0).toUpperCase() + this.props.link.title.slice(1)) : ""} meta={[
          {name: "description", content: "This website was made by Derrick Dunville to solve an inteview coding challange for Ambassador."}
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div style={{width: "100%", display: "flex", justifyContent: "center", textAlign: "center"}}>
        {this.props.link && !this.props.getLinkErrorMessage ? (
          <div>
            {this.head()}
            <h1>{this.props.link.title.charAt(0).toUpperCase() + this.props.link.title.slice(1)} are awesome!</h1>
            <h2>Come join Tim's World Wide Web!</h2>
            <NavLink to="/"><img src={logo}/></NavLink>
            <h1>Ambassador</h1>
          </div>
        ):(
          <div>
            {this.props.getLinkErrorMessage ? (
              <NotFoundPage.component />
            ):(
              <div></div>
            )}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    link: state.links.link || false,
    getLinkErrorMessage: state.links.getLinkErrorMessage || false
  }
}

function loadData(store, match, query, url, referring_url){
  return store.dispatch(getLink(match.params.title))
}

export default {
  loadData,
  component: connect(mapStateToProps, { getLink, clearLink })(withRouter(withStyles(homeStyle)(LinkPage)))
}
