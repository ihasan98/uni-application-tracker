import React, { Component } from "react";
import { connect } from "react-redux";
import { addAlert} from "../store/actions/alerts";

export default function withAuth(adminOnly, ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
        if (this.props.isAuthenticated === false) {
            this.props.addAlert("error", "You must be logged in to view that page!");
            this.props.history.push("/login");
        } else if (adminOnly && !this.props.isAdmin) {
            this.props.addAlert("error", "You do not have permission to view this page!");
            this.props.history.push("/");
        }
    }
    componentWillUpdate(nextProps) {
        if (this.props.isAuthenticated === false) {
            this.props.addAlert("error", "You must be logged in to view that page!");
            this.props.history.push("/login");
        } else if (adminOnly && !this.props.isAdmin) {
            this.props.addAlert("error", "You do not have permission to view this page!");
            this.props.history.push("/");
        }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated, isAdmin: state.currentUser.user.isAdmin};
  }

  return connect(mapStateToProps, { addAlert })(Authenticate);
}