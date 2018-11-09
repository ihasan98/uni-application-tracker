import React, { Component } from 'react';
import 'typeface-roboto';
import Users from './Users';
import Login from './Login';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem('token') != null
    }
    console.log(sessionStorage.getItem('token'))
  }

  async logout() {
    this.setState({isLoggedIn: false})
  }

  async login() {
    this.setState({isLoggedIn: true})
  }

  render() {
    var mainPage
    if (this.state.isLoggedIn === true) {
      mainPage = <Users logout={this.logout} />
    } else {
      mainPage = <Login login={this.login}/>
    }
    return (
      <div className="App">
        { mainPage }
      </div>
    );
  }
}

export default App;
