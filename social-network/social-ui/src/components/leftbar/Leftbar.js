import React, { useContext } from 'react';
import './leftbar.scss';
import friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Event from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import { AuthContext } from '../../context/authContext';



const Leftbar = () => {

  const {currentUser}=useContext(AuthContext);

  return (
    <div className='leftbar'>
      <div className="container-l">
        <div className="menu-l">
          <div className="user-l">
            <img src={currentUser.profilePic} alt="demo" />
            <span>{currentUser.name}</span>
          </div>
          <div className="items-l">
            <img src={friends} alt="friend" />
            <span>Friends</span>
          </div>
          <div className="items-l">
            <img src={Groups} alt="groups" />
            <span>Groups</span>
          </div>
          <div className="items-l">
            <img src={Market} alt="market" />
            <span>Market</span>
          </div>
          <div className="items-l">
            <img src={Watch} alt="watch" />
            <span>Watch</span>
          </div>
          <div className="items-l">
            <img src={Memories} alt="memories" />
            <span>Memories</span>
          </div> 
        </div>
        <hr/>
        <div className="menu-l">
          <span>Your shorcuts</span>
          <div className="items-l">
            <img src={Event} alt="event" />
            <span>Event</span>
          </div>
          <div className="items-l">
            <img src={Gaming} alt="gaming" />
            <span>Gaming</span>
          </div>
          <div className="items-l">
            <img src={Gallery} alt="gallery" />
            <span>Gallery</span>
          </div>
          <div className="items-l">
            <img src={Videos} alt="videos" />
            <span>Videos</span>
          </div>
          <div className="items-l">
            <img src={Messages} alt="messages" />
            <span>Messages</span>
          </div>
        </div>
        <hr/>
        <div className="menu-l">
          <span>Others</span>
          <div className="items-l">
            <img src={Tutorials} alt="tutorials" />
            <span>Tutorials</span>
          </div>
          <div className="items-l">
            <img src={Courses} alt="courses" />
            <span>Courses</span>
          </div>
          <div className="items-l">
            <img src={Fund} alt="fund" />
            <span>Fund</span>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default Leftbar;
