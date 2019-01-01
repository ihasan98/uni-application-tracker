import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: props.isLoggedIn,
            username: props.username
        }
        this.logout = this.props.logout;
    }

    componentDidUpdate(prevProps) {
        // The if statements are necessary, otherwise we enter an infinite loop
        console.log(
            "menubar update"
        )
        if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
            this.setState({ isLoggedIn: this.props.isLoggedIn })
        }
        if (this.props.username !== prevProps.username) {
            this.setState({ username: this.props.username });
        }
    }

    render() {
        var usernameText
        var logoutButton
        if (this.state.isLoggedIn) {
            usernameText = "Welcome " + this.state.username;
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

export default MenuBar;