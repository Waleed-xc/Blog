import { useState } from "react"
import { useUserSignup } from "../Hooks/useUserSignup"
import { Link } from "react-router-dom"
import Icons, { PersonIcon,EmailIcon, PasswordIcon } from '../Users/Icons';

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {signup, error, isLoading} = useUserSignup()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(username,email, password)
  }
  return (

    
 <div className="main">
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
   <div  className="h-10 d-flex align-items-center justify-content-center" >
<form class="form w-25  "   onSubmit={handleSubmit} >
    <p id="heading">Sign Up</p>
    <div class="field">
    <PersonIcon/>

      <input type="text" className="input-field" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your name"/>
    </div>
    <div class="field">
    <EmailIcon/>
      <input type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email"/>

    </div>
    <div class="field">
    <PasswordIcon/> 
      <input type="password" className="input-field"    onChange={(e) => setPassword(e.target.value)}   value={password}      placeholder="Password"/>
    </div>
    <div class="btn">
    <button class="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign Up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>




    </div>

    <div className="login">
<p className="text-white"> If You  Already Have an Account You can Login Here </p>
    <Link to="/login">
      <button className="button2">Login</button>
    </Link>
    
    </div>
    <div class="text-center">
    {error && <div  style={{textAlign: 'center'}}  className="card text-white bg-danger">{error}</div>}
</div>
</form>



</div>
<br />
<br />
<br />
<br />
<br />

</div>



  )
}
export default UserSignup