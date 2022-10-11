import React from 'react'

import { Link , useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  const history=useNavigate()
const logout=()=>{
  localStorage.removeItem('TOKEN')
  history('/login');
  history(0)

}
  return (
    <>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}  `} to="/">Home</Link></li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/About">About</Link></li>
         
        </ul>
       
       {!localStorage.getItem('TOKEN')?<div>
       <Link role="button" className="btn btn-secondary mx-1" to="/login" >Login</Link>
        <Link role="button" className="btn btn-secondary mx-1" to="/signup">Signup</Link>
       </div>: <button role="button" className="btn btn-secondary mx-1" onClick={logout}>Logout</button>
       } 
    </div>
  </div>
</nav>

</>
    
  )
}

export default Navbar
