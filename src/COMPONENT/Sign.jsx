import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Sign(props) {
  const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" })
  const host = "http://localhost:5000"

  const history = useNavigate()

  const redirect = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name: credential.name, Email: credential.email, Password: credential.password })
    });
    const jsonn = await response.json()
    
    console.log(jsonn)

    if(jsonn.sucess){
      localStorage.setItem('TOKEN',jsonn.TOKEN)
      setcredential({ name: "", email: "", password: "", cpassword: "" })
      props.setAlert("success","  Welcome !!!")
      history('/');
    }
    else{
    props.setAlert("danger","  Account with this email already exist ")
    }


  }


  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })

  }

  return (
    <div className='container'>
      <div className="w-50 m-auto">

        <p className="text-center h1 fw-bold mb-5 mt-4">Sign up</p>

        <form onSubmit={redirect}>

          <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input type="text" id="name" className="form-control" onChange={onchange} value={credential.name} name="name" placeholder='must be of 3 characters' />
              <label className="form-label" htmlFor="name" style={{ marginRight: "0px" }}>Your Name</label>
              <div className="form-notch"><div className="form-notch-leading" style={{ width: " 9px" }}></div><div className="form-notch-middle" style={{ width: "71.2px" }}></div><div className="form-notch-trailing"></div></div></div>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input type="email" id="email" className="form-control" onChange={onchange} value={credential.email} name="email" />
              <label className="form-label" htmlFor="email" style={{ marginLeft: "0px" }}>Your Email</label>
              <div className="form-notch"><div className="form-notch-leading" style={{ width: "9px" }}></div><div className="form-notch-middle" style={{ width: "68.8px" }}></div><div className="form-notch-trailing"></div></div></div>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input type="password" id="password" className="form-control" onChange={onchange} value={credential.password} name="password" placeholder='must be of 8 characters' />
              <label className="form-label" htmlFor="password" style={{ marginLeft: "0px" }}>Password</label>
              <div className="form-notch"><div className="form-notch-leading" style={{ width: "9px" }}></div><div className="form-notch-middle" style={{ width: "64.8px" }}></div><div className="form-notch-trailing"></div></div></div>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input type="password" id="cpassword" className="form-control" onChange={onchange} value={credential.cpassword} name="cpassword" />
              <label className="form-label" htmlFor="cpassword" style={{ marginLeft: " 0px" }}>Repeat your password</label>
              <div className="form-notch"><div className="form-notch-leading" style={{ width: " 9px" }}></div><div className="form-notch-middle" style={{ width: "104px" }}></div><div className="form-notch-trailing"></div></div></div>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg" disabled={credential.name.length<3 || credential.password.length<8}>Register</button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default Sign
