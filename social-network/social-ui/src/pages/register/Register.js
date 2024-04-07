// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const [inputs, setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:""
  });
  const [err, setErr]=useState(false);

  const handleChange= (e) =>{
    setInputs((prev)=>({...prev, [e.target.name]:e.target.value}));
  };

  const handleClick= async (e)=>{
    e.preventDefault();

    try{
      await axios.post("http://localhost:8000/api/auth/register", inputs);
    }catch(err){
      setErr(err.response.data);
    }
  };
  return (
    <div className='register'>
      <div className='card-r'>
        <div className='left-r'>
          <h1>NoPe Chat</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae sit magnam dolor sunt natus excepturi, blanditiis sint
            esse.
          </p>
          <div className='navigate-r'>
          <span>Already registered?</span>
          <Link to='/login'>
          <button>Login</button>
          </Link>
          </div>
        </div>
        <div className="right-r">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name= "name" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
