import React, { useContext, useState } from 'react'
import './share.scss'
import friend from '../../assets/friend.png';
import addPlace from '../../assets/map.png';
import addImage from '../../assets/img.png';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';


const Share = () => {

  const [file,setFile]=useState(null);
  const [desc, setDesc]=useState("");

  const upload = async ()=>{
    try{
      const formData = new FormData();
      formData.append("file",file)
      const res= await makeRequest.post("/upload", formData);
      return res.data
    }catch(err){
      console.log(err);
    }
  }
  const { currentUser } = useContext(AuthContext);

  const queryClient=useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost)=>{
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleClick= async e=>{
    e.preventDefault();
    let imgUrl="";
    if(file) imgUrl= await upload();
    mutation.mutate({desc, img:imgUrl});
    setDesc("");
    setFile(null);
  }

  return (
    <div className='share-sh'>
      <div className='container-sh'>
        <div className='user-sh'>
          <div className="left-sh">
            <img src={currentUser.profilePic} alt='demo' />
            <input type="text" placeholder= {`What's on your mind ${currentUser.name}?`} onChange={e=>setDesc(e.target.value)} value={desc} />
          </div>
          <div className="right-sh">
            {file && <img className='file' alt='' src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className='share'>
          <div className='additional-sh'>
            <input type="file" id='file' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
            <label htmlFor="file">
            <div className='item-sh'>
              <img src={addImage} alt='imageAdding' />
              <span>Add Image</span>
            </div>
            </label>
            <div className='item-sh'>
              <img src={addPlace} alt='placeAdding' />
              <span>Add Place</span>
            </div>
            <div className='item-sh'>
              <img src={friend} alt='friend' />
              <span>Add Friend</span>
            </div>
          </div>
          <button onClick={handleClick}>Share</button>
        </div>
      </div>
    </div>
  )
}

export default Share
