import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './categoryboard.css';

const Categoryboard = (props) => {
    const [category , setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/categories/get')
        .then(res => setCategory(res.data))
        .catch(err => console.log(err));
    }, []);


    const handleDelete = async(id) => {
        try {
            await axios.delete('http://localhost:8000/categories/delete'+id)
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
        <br/>
        <br/>
        <button> <Link to={'/createCategory'}>Add</Link> </button>
        <table border="2" cellPadding="5">
            <caption><h1>Categories Data</h1></caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    category.map((data,i)=>(
                        <tr key={i}>
                            <td>{data.category_name}</td>
                            <td>{data.category_title}</td>
                            <td>{data.category_description}</td>
                            <td>
                                <button onClick={e => handleDelete(data.category_id)}><Link>Delete</Link></button>
                                <button><Link to={"/updateCategory/"+data.category_id}>Edit</Link></button>
                            </td>
                        </tr>

                    ))
                }

            </tbody>
        </table>
        </div>
            
            
        
    );
}
;
export default Categoryboard;