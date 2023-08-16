import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
const Home = (props) => {
    const [category , setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/categories/get')
        .then(res => setCategory(res.data))
        .catch(err => console.log(err));
    }, []);

    return(
        <>
            {
                    category.map((data,i) => (
                        <div className='product-card'  key={i}>
                        <div className='card-top'>
                            <img src={'data.category_title'} alt='image'/>
                        </div>
                        <div className='card-info' >
                            
                            <h4 className='title'>{data.category_name}</h4>
                            <p className='description'>
                                {data.category_description}
                            </p>
                            <button> <Link to={'/product-details/'+data.category_id}>Details</Link></button>
                            <br/>
                        </div>
                        </div>
                       
                    ))
            }

        </>
            
            
        
    );
}
;
export default Home;