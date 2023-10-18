import { useState } from "react"
import { useUserSignup } from "../Hooks/useUserSignup"
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
    <ul class="background">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <form  onSubmit={handleSubmit} >
<p></p>
<br/>
<br/>
<br/>
<br/>
<br/>
<div className="h-10 d-flex align-items-center justify-content-center">
  <div class="card text-black bg-light w-25" style={{maxWidth: "20"}} >
<fieldset style={{marginBlock: "20"}} >
<div class="card-header text-center ">User Signup</div>
<div class="card-body">
    <div className="w-150 p-3"> 
    <div className="form-group mt-2 ">  
      <label className="form-label mt-3">Name</label>
      <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your name"/>
    </div>
    <div className="form-group mt-2 ">  
      <label className="form-label mt-3">Email address</label>
      <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email"/>
    </div>
    <div className="form-group">
      <label className="form-label mt-3">Password</label>
      <input type="password" className="form-control"    onChange={(e) => setPassword(e.target.value)}   value={password}      placeholder="Password"/>
    </div>
  </div>
<div class="text-center">
    <button disabled={isLoading}  class="btn btn-light active">Sign Up</button>
<br />
<br />

    <p>Already Logged In?  <a  href="/login" class="btn btn-light active" > Login </a> 
    </p>

    {error && <div  style={{textAlign: 'center'}}  className="card text-dark bg-warning">{error}</div>}
    </div>


  </div>
  </fieldset>
  </div>

  </div>
</form>
</ul> 
  )
}
export default UserSignup