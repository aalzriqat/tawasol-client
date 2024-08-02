import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../redux/modules/posts";
import { showAlertMessage } from "../../redux/modules/alerts";

const CommentForm = ({ postId, addComment, showAlertMessage }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (text.trim().length === 0) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      // Attempt to add the comment
      await addComment(postId, { text });
      setText(""); // Reset the form on success
      setError(null); // Clear any previous error
    } catch (error) {
      // Handle the error (e.g., display a message)
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="post-card">
      <p className="form-title center">Leave a Comment</p>
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      <form onSubmit={onSubmit}>
        <textarea
          name="text"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-primary" value="Post" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
