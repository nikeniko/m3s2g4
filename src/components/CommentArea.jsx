import React, { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.asin && this.props.asin !== prevProps.asin) {
      this.fetchComments(this.props.asin);
    }
  }

  fetchComments = async (asin) => {
    this.setState({ isLoading: true, isError: false, comments: [] });
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdkNWM2ZjNhMzhjYjAwMTVmNjNjZjkiLCJpYXQiOjE3MTk0OTM0NzksImV4cCI6MTcyMDcwMzA3OX0.jwbExyPvwD6_oF-ey5jx_c7SW-7ohDWAVwm_wmsbpZQ",
          },
        }
      );

      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments, isLoading: false, isError: false });
      } else {
        let error = await response.text();
        this.setState({ isLoading: false, isError: true, errorMessage: error });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  render() {
    const { isLoading, isError, errorMessage, comments } = this.state;
    const { asin } = this.props;

    return (
      <div className="text-center">
        {isLoading && <Loading />}
        {isError && <Error message={errorMessage} />}
        {!asin && <p>Nessun libro selezionato</p>}
        {asin && !isLoading && !isError && (
          <>
            <AddComment asin={asin} />
            <CommentList commentsToShow={comments} />
          </>
        )}
      </div>
    );
  }
}

export default CommentArea;
