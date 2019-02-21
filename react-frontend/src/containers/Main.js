import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeAlert, addAlert } from "../store/actions/alerts";

// Importing the required components
import Login from "../components/Login";
import Users from "../components/Users/Users";
import Unis from "../components/Unis/Unis";

const Main = props => {
    const { authUser, alerts, removeAlert, currentUser } = props;
    return (
        <Route render={({location}) => (
            <Switch location={location}>
                {/* Login route. */}
                <Route exact path="/login" render={(props) => 
                <Login 
                    removeAlert={removeAlert}
                    alerts={alerts}
                    onAuth={authUser}
                    {...props}
                />} />

                {/* The users route */}
                <Route exact path="/users" render={(props) => 
                <Users 
                    removeAlert={removeAlert}
                    alerts={alerts}
                    currentUser={currentUser.user}
                    {...props}
                />} />

                {/* The university routes. */}
                <Route exact path="/unis" render={(props) => 
                <Unis 
                    removeAlert={removeAlert}
                    alerts={alerts}
                    currentUser={currentUser.user}
                    {...props}
                />} />
            </Switch>
        )} />
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      alerts: state.alerts
    };
}
  
export default withRouter(
    connect(mapStateToProps, { authUser, removeAlert, addAlert })(Main)
);