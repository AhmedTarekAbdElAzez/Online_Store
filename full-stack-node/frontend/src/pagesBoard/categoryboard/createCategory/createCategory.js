import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateCategory = () =>{
    const [name , setName] = useState('')
    const [description , setDescription] = useState('')
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/categories/create',{name, description})
        .then(res => {
            console.log(res);
            navigate('/categoryBoard');
        }).catch(err => console.log(err));
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Add Category</h1>
                <div>
                    <input type="file"/>
                </div>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder="Enter Description" className="form-control" 
                        onChange={e => setDescription(e.target.value)} />
                </div>
                <br />
                <button className='btn btn-success'>submit</button>
                <br /><br /><br />
            </form>
        </>
    )
}
export default CreateCategory;