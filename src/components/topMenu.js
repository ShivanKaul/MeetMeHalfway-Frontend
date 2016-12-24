import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import ModalDialog from './modalDialog';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="My Shows" />
  </IconMenu>
);

class TopMenu extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="CodeJam"
          iconElementLeft={<IconButton><NavigationRefresh /></IconButton>}
          iconElementRight={<ModalDialog />} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logged: state.logged
  }
}

export default connect(mapStateToProps, actions)(TopMenu);

const styles = {
  authBtn: {
    marginTop: '6px'
  }
}
