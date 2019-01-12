import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Button } from '@material-ui/core';

class MenuBar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/login");
    };

    render() {
        let usernameText
        let logoutButton
        if (this.props.currentUser.isAuthenticated) {
            usernameText = "Welcome " + this.props.currentUser.user.username;
            logoutButton = <Button onClick={this.logout}> Logout </Button>
        } else {
            usernameText = "Please log in!"
            logoutButton = null
        }
        return <div className="menuBar">
            {usernameText}
            {logoutButton}
          </div>;
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
  }
  
export default withRouter(
    connect(mapStateToProps, { logout })(MenuBar)
);