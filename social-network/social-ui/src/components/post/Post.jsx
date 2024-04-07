import React, { useContext, useState } from 'react'
import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useQuery,useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';


const Post = ({post}) => {

    const  [commentOpen, setCommentOpen]=useState(false);
    const {currentUser}=useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
      queryKey: ['likes', post.id],
      queryFn: () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) =>{
          return res.data;
        })
    })

    const queryClient=useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked)=>{
      if(liked) return makeRequest.delete("/likes?postId="+ post.id);
      return makeRequest.post("/likes",{postId:post.id});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })

    const handleLike=()=>{
      mutation.mutate(data.includes(currentUser.id));
    }

  return (
    <div className='post-p'>
      <div className='container-p'>
        <div className='user-p'>
          <div className='userInfo-p'>
            <img src={post.profilePic} alt='' />
            <div className='details-p'>
              <Link to={`/profile/${post.userId}`}  style={{textDecoration:'none'}}>
                <span className='name-p'>{post.name}</span>
              </Link>
                <span className='date-p'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className='content-p'>
            <p>{post.desc}</p>
            <img src={"./upload/"+post.img} alt="" />
        </div>
        <div className='info-p'>
            <div className="item-p">
                {error ? "Something went wrong":(isLoading? "loading..":data.includes(currentUser.id) ? (<FavoriteOutlinedIcon style={{ color : "red"}} onClick={handleLike}/>): (<FavoriteBorderOutlinedIcon onClick={handleLike}/>))}
                {(data &&data.length)} Likes
            </div>
            <div className="item-p" onClick={()=> setCommentOpen(!commentOpen)}>
                <TextsmsOutlinedIcon />
                12 Comments
            </div>
            <div className="item-p">
                <ShareOutlinedIcon />                
                Share
            </div>
        </div>
        {commentOpen && <Comments postid={post.id}/>}
      </div>
    </div>
  )
}

export default Post
