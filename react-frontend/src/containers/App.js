import React, { Component } from 'react';
import 'typeface-roboto';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "../store";
import Main from './Main';
import MenuBar from '../MenuBar';
import Loading from '../components/Loading';
import { getCurrentUser } from '../services/api';
import { setCurrentUser, setAuthorizationToken} from "../store/actions/auth";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    if (localStorage.accessToken) {
      setAuthorizationToken(localStorage.accessToken);
      // prevent someone from manually tampering with the key of jwtToken in localStorage
        getCurrentUser()
        .then(user => {
          store.dispatch(setCurrentUser(user));
          this.setState({loading : false})
        })
        .catch (e => {
        localStorage.removeItem('accessToken');
        store.dispatch(setCurrentUser({}));
        this.setState({loading : false})
      })
    } else {
      this.setState({loading : false});
    }
  }

  render() {
    const {loading} = this.state;
    let content;
    if (loading) {
      content = <Loading />
    } else {
      content = ( 
      <div>
        <MenuBar />
        <Main />
      </div>
      )
    }
    return (
      <Provider store={store}>
        <Router>
          {content}
        </Router>
      </Provider>
    );
  }
}

export default App;