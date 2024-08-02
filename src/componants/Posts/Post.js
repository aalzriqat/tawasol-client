import React,{useEffect} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../Posts/PostItem"; 
import { getPost } from "../../redux/modules/posts";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

function Post({getPost, posts: {post,loading}}) {
    let {id}=useParams()
    useEffect(()=>{
        getPost(id)
    },[getPost,id])
    
    return loading || post ===null ? null : (
        
        <div className="home">
        <div >
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id}/>
        </div>
        {
            post.comments.map(comment=>(
                <CommentItem key={comment._id} comment={comment} postId={post._id}/>
            ))
        }
        </div>
    );
}

const mapStateToProps = (state) => ({
    posts: state.posts,
  });

  export default connect(mapStateToProps, { getPost })(Post);