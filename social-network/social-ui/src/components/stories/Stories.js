import React, { useContext } from 'react';
import "./stories.scss";
import { AuthContext } from '../../context/authContext';

const Stories = () => {

    const {currentUser}=useContext(AuthContext)

    const stories = [
        {
          id: 1,
          name: "Muskan",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 2,
          name: "Mohini",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 3,
          name: "Neha",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 4,
          name: "Priti",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
      ];

  return (
    <div className='stories-s'>
        <div className="story-s">
            <img src={currentUser.profilePic} alt="story-img" />
            <div className="user-s">
              <img src={currentUser.profilePic} alt="story-img" />
              <span>create story</span>
              <button>+</button>
            </div>
        </div>
        {stories.map(story=>(
            <div className="story-s" key={story.id}>
                <img src={story.img} alt="story-img" />
                <div className="user-s">
                  <img src={currentUser.profilePic} alt="story-img" />
                  <span>{story.name}</span>
                </div>
            </div>
        ))}       
    </div>
  )
}

export default Stories;
