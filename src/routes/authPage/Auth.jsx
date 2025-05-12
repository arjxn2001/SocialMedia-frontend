import { useState } from 'react'
import './auth.css'
import { FaGem } from 'react-icons/fa'
import apiRequest from "../../utils/apiRequest"
import { useNavigate } from 'react-router'
import useAuthStore from '../../utils/authStore'

const Auth = () => {

    const [isRegister, setIsRegister]= useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {setCurrentUser} = useAuthStore()

    const handleSubmit =async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)

      const data = Object.fromEntries(formData)

      try{
        const res =await apiRequest.post(`/users/auth/${isRegister ? "register":"login"}`,data);

        setCurrentUser(res.data);

        navigate("/")


      }catch(err){
        setError(err.response.data.message)
      }
    }

  return (
  <div className='main flex justify-center items-center '>
  <div className="card ">
    
    <div className="card-image flex justify-center text-3xl gap-2 items-center ">
      <h1 className='bg-linear-to-b from-red-500 to-black text-transparent bg-clip-text font-bold'>GEMSY </h1>
      <span className='mt-2 '><FaGem/></span>
    </div>

    {isRegister ? (
        <form className='form' onSubmit={handleSubmit} >
        <h1 className='text-2xl font-semibold p-2 bg-linear-to-b from-red-500 to-black text-transparent bg-clip-text'>{isRegister ? "Sign up" : "Login"}</h1>

        <input
         className='inp'
          type="text"
           placeholder="Username"
            required
             name='userName'
             id='userName' />

        {/* <p className="error">{errorUsername}</p> */}

        <input
         className='inp'
          type="text"
           placeholder="Name"
            required
             name='displayName'
             id='displayName' />

        {/* <p className="error">{errorEmail}</p> */}

        <input
         className='inp' 
         type="email" 
         required
         placeholder="Email"  
         name='email'
         id='email'/>

        <input  
        className='inp' 
        type="password"
         placeholder="Password"
         required
        name='password'
         id='password'   />

        <button className="submit-btn " type='submit'>Register</button>
        <p onClick={()=>setIsRegister(false)}>Already have an account? <b className='cursor-pointer'>Login</b></p>

            {error && <p className='error'>{error}</p>}
        
        {/* <p className="error">{errorPassword}</p> */}

        
        {/* <p className="error">{errorConfirmPassword}</p> */}

    </form>

    ) : (

        <form className='form' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-semibold p-2 bg-linear-to-b from-red-500 to-black text-transparent bg-clip-text'>{isRegister ? "Sign up" : "Login"}</h1>

        {/* <p className="error">{errorUsername}</p> */}

        <input className='inp' type="email" placeholder="Email" name='email' />

        {/* <p className="error">{errorEmail}</p> */}

        <input  className='inp' type="password" placeholder="Password" name='password'/>
        
        {/* <p className="error">{errorPassword}</p> */}

        
        {/* <p className="error">{errorConfirmPassword}</p> */}

        <button className="submit-btn" >Login</button>
        <p onClick={()=>setIsRegister(true)}>Already have an account? <b className='cursor-pointer'>Sign up</b></p>

        {error && <p className='error'>{error}</p>}
        
        </form>
    )}
    
  </div>
</div>
)
}

export default Auth
