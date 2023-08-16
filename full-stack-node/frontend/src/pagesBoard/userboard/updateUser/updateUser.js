import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () =>{
    const [name , setName] = useState('')
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [id] = useState('')
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8000/categories/update'+id,{name, title, description})
        .then(res => {
            console.log(res);
            navigate('/categoryBoard');
        }).catch(err => console.log(err));
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Update Category</h1>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter Title" className="form-control" 
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder="Enter Description" className="form-control" 
                        onChange={e => setDescription(e.target.value)} />
                </div>
                <br />
                <button className='btn btn-success'>update</button>
                <br /><br /><br />
            </form>
        </>
    )
}
export default UpdateCategory;