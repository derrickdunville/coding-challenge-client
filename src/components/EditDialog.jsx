import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { putLink } from '../actions/linkActions'
import { Field, reduxForm, formValueSelector  } from 'redux-form'

const alphaNumericUnderscoreRegex = new RegExp("^[a-zA-Z0-9_]+$")
const selector = formValueSelector('editLink')

const validate = values => {
  const errors = {}
  if (!values['title']) {
    errors['title'] = 'Link title is required'
  }
  if (values.title && !alphaNumericUnderscoreRegex.test(values.title)) {
    errors.title = 'Must contain only alphanumeric characters and underscores'
  }
  return errors
}

const renderTextField = ({
  label,
  type,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  console.log("input: ")
  console.dir(input)
  return(
    <TextField
      style={{marginTop: "0px", marginBottom: "0px"}}
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
}


class EditDialog extends React.Component {
  state = {
    open: false,
    title: this.props.link.title
  }
  componentDidMount(){
    console.log("component did mount")
  }

  handleSave = (event) => {
    event.persist()
    event.preventDefault()
    console.dir(this.props.title)
    // this.props.putLink(this.props.link.title, this.state.title)
    // this.handleClose()
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { title } = this.props
    console.log("initialValues: ")
    console.dir(this.props)
    return (
      <div>
        <Button color="default" onClick={this.handleClickOpen}>
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit {this.props.link.title}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSave}>
              <Field name="title" label="Title" component={renderTextField} type="text"/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log("props.link.title: ", props.link.title)
  return {
    initialValues: {
      title: props.link.title
    },
    title: selector(state, 'title')
  }
}

EditDialog = reduxForm({
  form: 'editLink',
  validate,
  enableReinitialize: true
})(EditDialog)

EditDialog = connect(
  mapStateToProps,
  { putLink }
)(EditDialog)


export default EditDialog
