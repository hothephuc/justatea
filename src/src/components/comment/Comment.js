import React, { useState, useEffect } from 'react'
import './Comment.css'
import { getUserDocument, getUserDocument } from '../../server/data-handle'

const Comment = ({comment}) => {
    //const user=user_data.find(user=>user.userID===comment.userID)
    const [user,setUser]=useState("");
    useEffect(() => {
      const getUser = async () => {
        const user = await getUserDocument(comment.userID);
        setUser(user);
      };
  
      getUser();
    }, []);

  return (
    <div className='comment'>
      <img src={user.imageUrl} alt={user.fullname}/>
      <div className='comment-content'>
        <strong>{user.fullname}</strong>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}

export default Comment