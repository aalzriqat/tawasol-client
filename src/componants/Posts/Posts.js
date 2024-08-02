import React,{useEffect} from "react";
import { connect } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Posts({getPosts,posts}) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="home">
      <div>
        <PostForm />
        <div>
            {
                posts.map(post=>(
                    <PostItem key={post._id} post={post}/>
                ))
            }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);