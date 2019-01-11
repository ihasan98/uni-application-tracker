import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeAlert, addAlert } from "../store/actions/alerts";

import Login from "../Login";


const Main = props => {
    const { authUser, alerts, removeAlert, currentUser } = props;
    return (
        <Route render={({location}) => (
            <Switch location={location}>
                {/* Login route. */}
                <Route exact path="/" render={(props) => 
                <Login 
                    removeAlert={removeAlert}
                    alerts={alerts}
                    onAuth={authUser}
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