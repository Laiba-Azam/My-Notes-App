import React,{useContext} from 'react'
import NoteContext from '../context/NoteContext';

const NoteItem = (props) => {
    const context=useContext(NoteContext)
    const {delnote}=context;
    const { note,updateN} = props;
    
    return (
        <>
            <div className="container">
                <div className="card text-center">  
                    <div className="card-body">
                        <h3 className="card-title">{note.title}</h3>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="uil uil-pen" style={{color: "#DE2449",fontSize:"1.6em",padding:"3px"}} onClick={()=>{updateN(note)}}></i>
                        <i className="uil uil-trash-alt" style={{color: "#135A25",fontSize:"1.6em",padding:"3px"}} onClick={()=>{delnote(note._id);props.showAlert("success"," Note has been deleted");}}></i>

                    </div>
                    <div className="card-footer text-muted">
                        {note.date}
                    </div>
                </div>
            </div>

        </>



    )
}

export default NoteItem
