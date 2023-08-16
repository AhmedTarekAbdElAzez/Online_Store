import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../userboard/userboard.css';

const Userboard =() => {
    const [user , setuser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/users/get')
        .then(res => setuser(res.data))
        .catch(err => console.log(err));
    }, []);
    const handleDelete = async(id) => {
        try {
            await axios.delete('http://localhost:8000/users/delete'+id)
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <>
            <h1>Data Tables</h1>
            <h2>Show  Users</h2> 
            <button><Link to={'/userCreate'}>Add</Link></button>
            <table className='user-board'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                {
                    user.map((data,i)=>(
                        <tr key={i}>
                            <td>{data.user_name}</td>
                            <td>{data.user_email}</td>
                            <td>
                            <button onClick={e => handleDelete(data.category_id)}><Link>Delete</Link></button>
                                <button><Link to={'/updateuser/'+data.user_id}>Edit</Link></button>
                            </td>
                        </tr>

                    ))
                }
                </tbody>
            </table>
        </>
    )
}
export default Userboard