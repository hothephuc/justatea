import React,  {useState, useEffect} from 'react'
import comment_data from '../assets/CommentData.js'
import Comment from '../comment/Comment.js';
import './CommentSection.css'
import user_data from '../assets/user.js';
import { fetchComments,fetchUserByID, fetchCommentsByProductID, getUserDocument, uploadComment} from '../../server/data-handle.js';

import { checkAuthState } from '../../server/auth.js';
import { Timestamp } from 'firebase/firestore';
const CommentSection = ({ productID }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
      const getCurrentUser = async () => {
        const authState = await checkAuthState();
        if (authState && authState.user) {
          const uid = authState.user.uid;
          const user = await getUserDocument(uid);
          setCurrentUser(user);
        }
      };
  
      getCurrentUser();
    }, []);

    console.log(currentUser)

    useEffect(() => {
      const getComment = async () => {
        const comment = await fetchCommentsByProductID(productID);
        setComments(comment);
      };
  
      getComment();
    }, []);

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
      uploadComment(comment);
    };
    
    const getCommentCount = () => {
      return comments.length;
    };

    let commentCount=getCommentCount();

  return (
    <div className='commentsection'>
        <div className='commentsection-header'>Bình luận ({commentCount})</div>
        <div className='all-comment'>
        {comments.map((item, index)=>(
            <Comment key={index} comment={item}/>
        ))}
        </div>
        <div className='enter-comment'>
        {currentUser?(
          <div className='commentsection-input'>
          <img src={currentUser.imageUrl}/>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            placeholder="Nhập bình luận..."
          />
          </div>
          ):(
          <p style={{marginRight:10, fontWeight:400,}}>Vui lòng đăng nhập để bình luận</p>
        )}
        </div>
    </div>
  )
}

export default CommentSection