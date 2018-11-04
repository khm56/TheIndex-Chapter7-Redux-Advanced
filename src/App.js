import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     authors: [],
  //     loading: true
  //   };
  // }
  //
  // fetchAllAuthors() {
  //   return instance.get("/api/authors/").then(res => res.data);
  // }
  //
  componentDidMount() {
    this.props.fetchAuthors();
  }

  getView() {
    // if (this.state.loading) {
    //   return <Loading />;
    // } else {
    return (
      <Switch>
        <Redirect exact from="/" to="/authors" />
        <Route path="/authors/:authorID" component={AuthorDetail} />
        <Route
          path="/authors/"
          render={props => (
            <AuthorsList {...props} authors={this.props.authors} />
          )}
        />
      </Switch>
    );
    // }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authors: state.rootauthors.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthors: () => dispatch(actionCreators.fetchAuthors())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
