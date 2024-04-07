import { useState } from 'react';
import './update.scss';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Update = ({setOpenUpdate}) => {

    const [texts, setTexts]=useState({
        name:"",
        city:"",
        website:""
    })
    const [file, setFile]=useState(null)

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

      const handleChange= async e=>{
        e.preventDefault();
        let imgUrl="";
        if(file) imgUrl= await upload();
        mutation.mutate({texts, img:imgUrl});
        setTexts("");
        setFile(null);
      }
  return (
    <div className='update-u'>
      <form action="">
        <input type="file" />
        <input type="file" />
        <input type="text" name='name' onChange={handleChange}/>
        <input type="text" name='city' onChange={handleChange}/>
        <input type="text" name='website' onChange={handleChange}/>
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update;
