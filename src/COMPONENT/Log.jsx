import React,{useState} from 'react'

import { useNavigate } from 'react-router-dom';

function Log(props) {
    const host = "http://localhost:5000"
    const [credential, setcredential] = useState({email:"",password:""})
    const history=useNavigate()
   
    const redirect=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({Email:credential.email,Password:credential.password})
          });
          const jsonn =await response.json()
           
          console.log(jsonn)
          if(jsonn.sucess){
            localStorage.setItem('TOKEN',jsonn.TOKEN)
            props.setAlert("success"," Welcomm back !!!")
            setcredential({email:"",password:""})
            history('/');
          }
          else{
            props.setAlert("danger","Try to log in with correct credentials ")
          }
         

    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
       
      }
  return (
   
        <div className="container w-50 m-auto" >
         
    <main className="form-signin  ">
      <form style={{width:"50vw"}} onSubmit={redirect} >
      <p className="text-center h1 fw-bold mb-5 mt-4">Sign In </p>
    
        <div className="form-floating m-3">
          <input type="email" className="form-control"   id="floatingInput" placeholder="name@example.com" value={credential.email} name="email" onChange={onChange} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating m-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={credential.password} name="password" onChange={onChange}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
        <button className="btn btn-primary btn-lg w-50" type="submit" >Log in</button></div>
        
      </form>
    </main>  
   
    </div> 
   
      
   
  )
}

export default Log
