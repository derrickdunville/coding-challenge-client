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

class EditDialog extends React.Component {
  state = {
    open: false,
    title: this.props.link.title
  }

  handleChange = (event) => {
    if(event.target.name === 'title'){
     this.setState({ title: event.target.value })
    }
  }

  handleSave = () => {
    this.props.putLink(this.props.link.title, this.state.title)
    this.handleClose()
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
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

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, {putLink})(EditDialog)
