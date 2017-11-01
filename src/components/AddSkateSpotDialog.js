/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import firebase from '../firebase.js';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class AddSkateSpotDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: this.props.isVisible,
      name: '',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    // conso
    const itemsRef = firebase.database().ref('spots');
    const item = {
      name: this.state.name,
      position: this.props.newSkateSpotPosition
    }
    itemsRef.push(item);
    this.setState({ open: false });
  };

  handleInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.isVisible} onRequestClose={this.props.toggle}>
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give the spot a Name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Spot name"
              type="text"
              fullWidth
              onChange={this.handleInput}
              value={this.state.name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}