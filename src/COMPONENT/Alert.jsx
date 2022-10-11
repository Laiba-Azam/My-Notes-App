import React from 'react'

const Alert = (props) => {
  const capital=(word)=>{
    if (word==="danger"){
      word="error"
    }
    const small=word.toLowerCase();
    return small.charAt(0).toUpperCase()+small.slice(1)
}
return (
  <div style={{height:"50px"}}>{ props.dismiss && <div>
    <div className={`alert alert-${props.dismiss.type} alert-dismissible fade show`} role="alert">
 <strong>{capital(props.dismiss.type)}</strong>:{props.dismiss.message}
  
</div>  
    </div>}</div>

)
}

export default Alert
