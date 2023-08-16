import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/dashboard.css';

const dashboard =() => {
    return(
        <div className='Dashboard'>
            <h1>Dashboard</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Dashboard &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><Link to={'../productBoard/'}>Products</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> 
                        <td><Link to={'../categoryBoard/'}>Categories</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><Link to={'../userBoard/'}>Users</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><Link to={'../ordersUsersBoard/'}>Order's Users</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
    )
}
export default dashboard;
