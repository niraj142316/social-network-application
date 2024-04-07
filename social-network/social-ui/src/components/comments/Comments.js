import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios.js';
import moment from 'moment';


const Comments = ({postid}) => {

    const {currentUser}=useContext(AuthContext);
    const [desc, setDesc]=useState("");
    const { isLoading, error, data } = useQuery({
      queryKey: ['comments'],
      queryFn: () =>
        makeRequest.get("/comments?postid=" + postid).then((res) =>{
          return res.data;
        })
    })

    const queryClient=useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment)=>{
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleClick= e=>{
    e.preventDefault();
    mutation.mutate({desc, postid});
    setDesc("");
  }
  

  return (
    <div className='comments-c'>
        <div className="write-c">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder='write a comment' onChange={(e)=>setDesc(e.target.value)} value={desc}/>
            <button onClick={handleClick}>Send</button>
        </div>
      {isLoading ? "loading..." : data.map(comment=>(
        <div className='comment-c'>
          <img src={comment.profilePic} alt="" />
          <div className="info-c">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className='date-c'>{moment(comment.createdAt).fromNow()}</span>
        </div>))}
    </div>
  )
}

export default Comments
