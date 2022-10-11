import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
// use ref say reference de sakte hai
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom';

const MyNotes = (props) => {
  const context = useContext(NoteContext)
  const { notes, fetchnote, updatenote } = context
  const history=useNavigate()
  useEffect(() => {
    // eslint-disable-next-line 
    if(localStorage.getItem('TOKEN')){
      fetchnote();  
     
    }
    else{
      history('/login');
      // it history(0) help to refresh page
      
      history(0)
      
     
    }
    
  }, [])

  const [notee, setnote] = useState({id:"", etitle: "", edescription: "", etag: "" })

  const updateN = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});

  }
  const ref = useRef(null)
  const refclose=useRef(null)
  const update = async () => {
    console.log("only update")
    await updatenote(notee.id,notee.etitle,notee.edescription,notee.etag)
    props.setAlert("success"," Note has been updated")
    console.log("updated database")
    refclose.current.click();


  }
  const onChange = (e) => {
    setnote({ ...notee, [e.target.name]: e.target.value })
   
  }


  return (
    <div className='container'>
      <button type="button"  ref={ref} className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ visibility: "hidden" }}>
      </button>
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
          
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="etitle">Title:</label>
                  <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="'Must be of atleast 3 characters'" onChange={onChange} name="etitle" value={notee.etitle}  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description:</label>
                  <textarea className="form-control" id="edescription" name="edescription" rows="3" onChange={onChange} value={notee.edescription} placeholder='Must be of atleast 5 characters' ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag:</label>
                  <input type="text" className="form-control" id="etag" name="etag" aria-describedby="emailHelp" placeholder="Add an Item to the list" onChange={onChange} value={notee.etag}/>
                </div>


              </div>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  className="btn btn-primary" onClick={update} disabled={notee.etitle.length<3 || notee.edescription.length<5}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center"> {notes.length===0 && "No notes to display"}</div>
     
      {notes.map((note) => {
        // passing props take who un prop ko news item wali file mia jakr implement kare basically jo bhi notes hongay woh note variable mai store hongay or inki destructruing hogi item wali file mai
        // Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:
        return <NoteItem key={note._id} updateN={updateN} note={note} 
        showAlert={props.setAlert} />;
      })}

    </div>
  )
}

export default MyNotes

