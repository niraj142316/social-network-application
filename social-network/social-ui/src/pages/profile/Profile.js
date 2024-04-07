import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Posts from '../../components/posts/Posts';
import { useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';

const Profile = () => {
  
  const [openUpdate, setOpenUpdate]=useState(false);
  const {currentUser}=useContext(AuthContext);
  const userId=parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) =>{
        return res.data;
      })
  })

  const {isLoading:rIsLoading, data:relationshipData } = useQuery({
    queryKey: ['relationships'],
    queryFn: () =>
      makeRequest.get("/relationship?followedId" + userId).then((res) =>{
        return res.data;
      })
  })
   
  const queryClient=useQueryClient();

  const mutation = useMutation({
    mutationFn: (following)=>{
      if(following) return makeRequest.delete("/relationship?userId="+ userId);
      return makeRequest.post("/relationship",{userId});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationships'] })
    },
  })

    const handleFollow=()=>{
      mutation.mutate(relationshipData.includes(currentUser.id));
    }
  
  return (
    <div className='profile-pr'>
      {isLoading ? "loading..." : <> <div className="images-pr">
        <img src={data?.coverPic || "placeholder-image-url"} alt="" className="cover" />
        <img src={data?.profilePic || "placeholder-image-url"} alt="" className="profilePic" />
      </div>
      <div className="profileContainer-pr">
        <div className="info-pr">
          <div className="left-pr">
            <a href="https://www.facebook.com/">
            <FacebookTwoToneIcon fontSize='small' />
            </a>
            <a href="https://www.instagram.com/">
            <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/">
            <LinkedInIcon />
            </a>
            <a href="https://twitter.com/">
            <TwitterIcon />
            </a>
          </div>
          <div className="center-pr">
              <span>{data?.name || "Name Placeholder"}</span>
              <div className="ctr-info">
                <div className="ctr-item">
                  <PlaceIcon />
                  <span>{data?.city || "Location Placeholder"}</span>
                </div>
                <div className="ctr-item">
                  <LanguageIcon />
                  <span>{data?.website || "Language Placeholder"}</span>
                </div>
              </div>
                {rIsLoading? "loading..." : (userId===currentUser.id ? (<button onClick={()=>setOpenUpdate(true)}>update</button>): (<button onClick={handleFollow}>{relationshipData.includes(currentUser.id)?"following":"follow"}</button>))}
          </div>
          <div className="right-pr">
          <EmailOutlinedIcon />
          <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div> </>}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate}/>}
    </div>
  )
}

export default Profile;
