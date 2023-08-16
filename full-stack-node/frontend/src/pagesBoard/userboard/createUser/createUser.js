import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateUser = () =>{
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/users/create',{name, email})
        .then(res => {
            console.log(res);
            navigate('/userBoard');
        }).catch(err => console.log(err));
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Add User</h1>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter Email" className="form-control" 
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <br />
                <button className='btn btn-success'>submit</button>
                <br /><br /><br />
            </form>
        </>
    )
}
export default CreateUser;