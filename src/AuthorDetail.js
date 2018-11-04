import React, { Component } from "react";
import axios from "axios";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

class AuthorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.getAuthor = this.getAuthor.bind(this);
  }

  componentDidMount() {
    this.getAuthor();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      this.getAuthor();
    }
  }

  getAuthor() {
    const authorID = this.props.match.params.authorID;
    this.props.fetchAuthorDetail(authorID);
  }

  render() {
    if (!this.props.author.id) {
      return <Loading />;
    } else {
      const author = this.props.author;
      console.log(author);
      return (
        <div className="author">
          <div>
            <h3>{author.first_name + " " + author.last_name}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={author.first_name + " " + author.last_name}
            />
          </div>
          <BookTable books={author.books} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    author: state.rootauthor.author
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthorDetail: id => dispatch(actionCreators.fetchAuthorDetail(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetail);
