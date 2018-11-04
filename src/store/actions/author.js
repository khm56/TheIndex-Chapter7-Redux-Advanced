import * as actionTypes from "./actionTypes";

import axios from "axios";

export const fetchAuthorDetail = author_id => {
  return dispatch => {
    axios
      .get(`https://the-index-api.herokuapp.com/api/authors/${author_id}`)
      .then(res => res.data)
      .then(author =>
        dispatch({
          type: actionTypes.FETCH_AUTHOR_DETAIL,
          payload: author
        })
      );
  };
};
