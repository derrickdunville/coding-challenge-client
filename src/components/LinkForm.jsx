import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles'
import formStyle from 'assets/jss/components/formStyle.jsx'

import {
  postLink
} from 'actions/linkActions'

class LinkForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        title: ""
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    if(event.target.name === 'title'){
        this.setState({ title: event.target.value })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    let link = {
      title: this.state.title,
    }
    this.props.postLink(link)
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
            <h4 style={{marginRight: "15px"}}>Add a Link:</h4>
            <TextField
              style={{marginTop: "0px", marginBottom: "0px"}}
              id="standard-name"
              label=""
              margin="normal"
              variant="outlined"
              shrunk="true"
              inputProps={{
                name: 'title',
                value: this.state.title,
                onChange: this.handleChange
              }}
            />
            <Button
              style={{width: '100px', marginLeft: "15px", height: '56px'}}
              color="primary"
              onClick={this.handleSubmit}
              >
              Add
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps,
  { postLink })(LinkForm)
