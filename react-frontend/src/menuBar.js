import React, { Component } from 'react';

class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: props.isLoggedIn,
            username: props.username
        }
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