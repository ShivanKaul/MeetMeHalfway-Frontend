import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, username: '', password: '' };

    this.handleAuth = this.handleAuth.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleAuth() {
    if (!this.props.logged) {
      this.setState({open: true});
    } else {
      this.handleLogout();
    }

  };

  handleRegister() {
    const { username, password } = this.state;

    if (username && password) {
      this.props.register(username, password);
    }

  }

  handleLogin() {
    const { username, password } = this.state;

    if (username && password) {
      this.props.login(username, password);
      //this.setState({ logged: true });
    }

    this.handleClose();
  }

  handleLogout() {
    this.props.logout();
  }

  handleClose() {
    this.setState({open: false});
  };

  onUsernameChange(ev) {
    this.setState({username: ev.target.value});
  };

  onPasswordChange(ev) {
    this.setState({password: ev.target.value});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogin}
      />,
      <FlatButton
        label="Register"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleRegister}
      />,
    ];

    return (
      <div>
        <RaisedButton style={{marginTop: '5px'}} onTouchTap={this.handleAuth} label={this.props.logged ?
          <span>Logout</span> :
          <span>Login/Register</span>}  />
        <Dialog
          title="Authentication"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <span>{this.props.dialogMessage}</span>
          <div>
            <TextField
            onChange={ev => this.onUsernameChange(ev)}
            value={this.state.username}
            hintText="Username"
            />
          </div>
          <div>
            <TextField
              onChange={ev => this.onPasswordChange(ev)}
              value={this.state.password}
              type="password"
              hintText="Password"
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logged: state.logged,
    dialogMessage: state.dialogMessage
  }
}

export default connect(mapStateToProps, actions)(ModalDialog);