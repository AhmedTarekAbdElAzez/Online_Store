import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './productboard.css';

const Productboard = (props) => {
    const [product , setproduct] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/products/get')
        .then(res => setproduct(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = async(id) => {
        try {
            await axios.delete('http://localhost:8000/products/delete'+id)
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
        <button><Link to={'/createProduct'}>Add</Link></button>
        <table border="2" cellpadding="5">
            <caption><h1>Products Data</h1></caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map((data,i)=>(
                        <tr key={i}>
                            <td>{data.product_name}</td>
                            <td>{data.product_price}</td>
                            <td>{data.product_description}</td>
                            <td>
                            <button onClick={e => handleDelete(data.category_id)}><Link>Delete</Link></button>
                                <button><Link to={'/updateProduct/'+data.product_id}>Edit</Link></button>
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
export default Productboard;