import { useState } from "react"
import  { useUserLogin }  from "../Hooks/useUserLogin"
import { useUserLogout } from "../Hooks/useUserLogout"
import { useAuthContext } from "../Hooks/useAuthContext";
import './style.css'
import { Link } from "react-router-dom";
import Icons, { EmailIcon, PasswordIcon } from '../Users/Icons';

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useUserLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  const { user } = useAuthContext()
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
    <p id="heading">Login</p>
    <div class="field">
    <EmailIcon/> 
      <input type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email"/>

    </div>
    <div class="field">
    <PasswordIcon/>
      <input type="password" className="input-field"    onChange={(e) => setPassword(e.target.value)}   value={password}      placeholder="Password"/>
    </div>
    <div class="btn">
    <button class="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>

    </div>
    
    <div className="signup">
<p className="text-white"> If You Want Sign Up you can Sign Up Here </p>
    <Link to="/">
      <button className="button2">Sign Up</button>
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
<br />
<br />
<br />


</div>

  )
}
export default UserLogin