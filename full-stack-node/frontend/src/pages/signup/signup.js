import React from 'react';
import { Link } from 'react-router-dom';
import '../signup/signup.css';

const signupPage =() => {
    return(
        <>
            <div className="login-root">
        <div className="box-root flex-flex flex-direction--column" style={{minHeight: '100vh', flexGrow: 1}}>
          
          <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{flexGrow: 1, zIndex: 9}}>
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>Cars Shop</h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">Sign up for new account</span>
                  <form id="stripe-login">
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">User Name</label>
                      <input type="text" name="name" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">Phone</label>
                      <input type="tel" name="phone" />
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">Password</label>
                        
                      </div>
                      <input type="password" name="password" />
                    </div>
                    <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                      <label htmlFor="checkbox">
                        <input type="checkbox" name="checkbox" /> Stay signed in for a week
                      </label>
                    </div>
                    <div className="field padding-bottom--24">
                      <input type="submit" name="submit" defaultValue="Continue" />
                    </div>                    
                  </form>
                </div>
              </div>
              <br /><br /><br /><br /><br />
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default signupPage;
