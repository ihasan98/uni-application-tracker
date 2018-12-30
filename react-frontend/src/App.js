import React, { Component } from 'react';
import 'typeface-roboto';
import Users from './Users';
import Unis from './Unis'
import Login from './Login';
import MenuBar from './MenuBar';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  async logout() {
    this.setState({user: null})
  }

  async login(user) {
    console.log("user")
    console.log(user)
    this.setState({user: user})
  }

  render() {
    var mainPage
    if (this.state.user != null) {
      if (this.state.user.isAdmin) {
        mainPage = <Users logout={this.logout} />;
      }
      else {
        mainPage = <Unis logout={this.logout} unis={this.state.user.unis} />
      }
    } else {
      mainPage = <Login login={this.login}/>
    }
    return (
      <div className="App">
        <MenuBar isLoggedIn={this.state.user !== null} username={this.state.user !== null ? this.state.user.username : "unknown" } />
        {mainPage}
      </div>
    );
  }
}

export default App;
