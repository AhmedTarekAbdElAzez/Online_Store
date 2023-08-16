import '../ProductInfoPage/ProductInfoPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductInfoPage =(props) => {
    const [product , setProduct] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/products/get')
        .then(res => setProduct(res.data))
        .catch(err => console.log(err));
    }, []);
    return(
        <>
            <h1 style={{textAlign:"center",color:"red"}}>Our Products</h1>

            {
                product.map((data,i) => (
                        <div className='product-card'  key={i}>
                        <div className='card-top'>
                            <img src={'images'+data.product_image+'.jpeg'} alt='image'/>
                        </div>
                        <div className='card-info' >
                            
                            <h4 className='title'>{data.product_name}</h4>
                            <p className='description'>
                                {data.product_description}
                            </p>
                            <p className='price'>{data.product_price}</p>
                            <button> <Link to={'/cart'}>Add to cart</Link></button>
                            <br/>
                        </div>
                        </div>
                       
                    ))
            }
        </>
    )
}

export default ProductInfoPage;
