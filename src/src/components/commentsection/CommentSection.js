import React,  {useState} from 'react'
import comment_data from '../assets/CommentData.js'
import Comment from '../comment/Comment.js';
import './CommentSection.css'
import user_data from '../assets/user.js';
import { uploadComment } from '../../server/data-handle.js';
const CommentSection = ({ productID }) => {
    const [comments, setComments] = useState(comment_data);
    
    const [newComment, setNewComment] = useState('');
    const productComments = comments.filter(comment => comment.productID === productID);
    const currentUser=user_data.find(user=>user.userID===3)

    const addComment = (newComment) => {
      setComments(prevComments => [...prevComments, newComment]);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); 
        handleAddComment();
      }
    };

    const handleCommentChange = (e) => {
      setNewComment(e.target.value);
    };
  
    const handleAddComment = () => {
      if (newComment.trim() === '') return;
      
      const comment = {
        productID: productID,
        userID: currentUser.userID,
        text: newComment,
      };
      addComment(comment);
      setNewComment('');
    };
    
    const getCommentCount = () => {
      return productComments.length;
    };

    let commentCount=getCommentCount();

  return (
    <div className='commentsection'>
        <div className='commentsection-header'>Bình luận ({commentCount})</div>
        <div className='enter-comment'></div>
        {productComments.map((item, index)=>(
            <Comment key={index} comment={item}/>
        ))}
        <div className='commentsection-input'>
        <img src={currentUser.avatar}/>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập bình luận..."
        />
        {/* <button onClick={handleAddComment}>Nhập</button> */}
        </div>
    </div>
  )
}

export default CommentSection