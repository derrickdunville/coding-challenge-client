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
      helperText={error}
      error={invalid}
    />
  )
}


class EditDialog extends React.Component {
  handleSave = (event) => {
    event.persist()
    event.preventDefault()
    this.props.handleSave(this.props.title)
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit {this.props.link}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label=""
              type="text"
              fullWidth
              variant="outlined"
              inputProps={{
                name: 'title',
                value: this.state.title,
                onChange: this.handleChange
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
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
  return {
    initialValues: {
      title: props.link
    },
    title: selector(state, 'title')
  }
}

export default connect(mapStateToProps, {putLink})(EditDialog)
