import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateProduct = (props) =>{
    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const [description , setDescription] = useState('')
    const [image , setImage] = useState('')
    const [id] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/products/update/'+id+{name, price, description, image})
        .then(res => {
            console.log(res);
            navigate('/productboard');
        }).catch(err => console.log(err));
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Add Product</h1>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <input type="number" placeholder="Enter Price" className="form-control" 
                        onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder="Enter Description" className="form-control" 
                        onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input type="text" placeholder="Enter path" className="form-control" 
                        onChange={e => setImage(e.target.value)} />
                </div>
                <br />
                <button>update</button>
                <br /><br /><br />
            </form>
        </>
    )
}
export default UpdateProduct;