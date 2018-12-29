import React, { Component } from 'react';

class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: props.isLoggedIn,
            username: props.username
        }
    }

    render() {
        var usernameText
        if (this.state.isLoggedIn) {
            usernameText = "Welcome " + this.state.username;
        } else {
            usernameText = "Please log in!"
        }
        return (
            <div className="menuBar">
                { usernameText }
            </div>
        )
    }
}

export default MenuBar;