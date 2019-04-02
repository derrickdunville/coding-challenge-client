import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postLink } from 'actions/linkActions'
import { Field, reduxForm, formValueSelector  } from 'redux-form'

const alphaNumericUnderscoreRegex = new RegExp("^[a-zA-Z0-9_]+$")
const selector = formValueSelector('link')

const validate = values => {
  const errors = {}
  // const requiredFields = ['title']
  // requiredFields.forEach(field => {
  //   if (!values[field]) { errors[field] = 'Required' }
  // })
  if (values.title && !alphaNumericUnderscoreRegex.test(values.title)) {
    errors.title = 'Must contain only alphanumeric characters and underscores'
  }
  return errors
}

const renderTextField = ({
  name,
  label,
  type,
  input,
  onChange,
  meta: { touched, invalid, error},
  ...custom
}) => (
  <TextField
    style={{marginTop: "0px", marginBottom: "0px"}}
    id="standard-name"
    label=""
    margin="normal"
    placeholder={label}
    variant="outlined"
    shrunk="true"
    inputProps={{
      ...input
    }}
    helperText={touched && error}
    error={touched && invalid}
  />
)

class LinkForm extends Component {
  constructor(props) {
    super(props);
  }


  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()
    this.props.postLink({title: this.props.title})
  }

  render(){
    console.log("rendering form")
    const { classes } = this.props;
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div style={{display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", height: "76px"}}>
            <h4 style={{marginRight: "15px"}}>Add a Link:</h4>
            <Field name="title" label="Title" component={renderTextField} type="text"/>
            <Button
              style={{width: '100px', marginLeft: "15px", height: '56px'}}
              color="primary"
              variant="outlined"
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
    title: selector(state, 'title')
  }
}

LinkForm = connect(
  mapStateToProps,
  {postLink}
)(LinkForm)

export default reduxForm({
  form: 'link',
  validate
})(LinkForm)
