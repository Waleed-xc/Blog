import { useState } from "react"
import { useUserSignup } from "../Hooks/useUserSignup"
import { Link } from "react-router-dom"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>
      <input type="text" className="input-field" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your name"/>
    </div>
    <div class="field">
    <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
    </svg>
      <input type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email"/>

    </div>
    <div class="field">
    <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
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