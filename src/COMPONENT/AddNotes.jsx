import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import MyNotes from './MyNotes'
// change for into htmlFor
export default function AddNotes(props) {
    const context = useContext(NoteContext)
    const { addnote } = context;
    const [notee, setnote] = useState({ title: "", description: "", tag: "" })
    const add = async (e) => {


        await addnote(notee);
        window.location.reload(false);
        setnote({ title: "", description: "", tag: "" })
       props.setAlert("success"," Note has been added sucessfully")
      


    }
    const onChange = (e) => {
        // yani ...note to rahe usmai jo bhi name ho uskay sath woh value attach hojai
        // e.target,name ki vakue woh e.target.name k equal hojai
        // concate return an array where push  update an array
        setnote({ ...notee, [e.target.name]: e.target.value })
    }


    return (
        <div>

            <div className="container 80 P-4 ">
                <h2 className="text-center my-2">
                    <strong>Add new notes</strong>
                </h2>

                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="Title" aria-describedby="emailHelp" placeholder="Must be of atleast 3 characters" onChange={onChange} name="title" required value={notee.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} required placeholder='Must be of atleast 5 characters' value={notee.description}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag:</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" placeholder="" onChange={onChange} required value={notee.tag} />
                </div>

                <button type="submit" id='add' className="btn btn-primary my-2 " onClick={add}disabled={notee.title.length<3 || notee.description.length<5}>Add to List</button>
                <h2 className="card-header my-2  text-center">
                    <strong>Your Notes</strong>
                </h2>

                <MyNotes setAlert={props.setAlert}/>
            </div>

        </div>
    )
}
