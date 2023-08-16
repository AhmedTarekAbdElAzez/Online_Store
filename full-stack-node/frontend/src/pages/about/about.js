import React, { useState , useEffect , useRef } from 'react';
import '../about/about.css';

const AboutPage =() => {

const email = useRef("");
const message = useRef("");

const contactUs =(event)=>{
    event.preventDefault();
    console.log(email);
    console.log(message);

}

    return(
        <div className='about'>
            <h1 className='title'>About Us </h1>
            <h2 className='sub-title'>Cars : </h2>
            <p>Cars are vehicles formed from a group of mechanical parts that work properly and appropriately to, 
                    do this to move the car, and it is an important means of transportation in our time,and cars are divided
                    into several sections, there are small private cars that people own in order to go to workor Family, and
                    there are large buses that are used to carry passengers, and trucks that work to transport goods,and in
                    this article we will introduce you to the history of cars, a conyot as well as electric cars.</p>
            
                <br />
                <br />
                <br />
                <br />
                <br />
            <h2 className='sub-title'> Who We Are ? </h2>
            <p> We are a team working together to offer brands and car styles around the worldThrough each of us studies 
            everything related to the car of its kind and its style and prices and information about it and its defects and
            advantagesAnd through this the car is displayed on our website with the necessary information about itAnd all you
            have to do is choose the appropriate car type and tell us about it by sending the required data and information .</p>  
            
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className='final'>Finally</h1>
            <h2 className='final'>If you want contact with us please fill this form , THank you .</h2>


            <fieldset className='form' onSubmit={(e) => contactUs(e)}>
                    <legend><h1 className='personal'>personal information </h1></legend>
                    <h2 className='msg'> Welcome to our website </h2>
                    {/* <label> First Name </label>
                    <input type='text' name='First Name' placeholder='Your name' maxlength='10' />
                    <br />
                    <br />
                    <label> Last Name </label>
                    <input type='text' name='Last Name' placeholder='Last name ' maxlength='10' /> */}
                    <br />
                    <br />
                    <label htmlFor='email'>Email Adrress </label>
                    <input id='email' type='email' name='Email Adrress' placeholder='your @ email.com'
                    ref={email}
                    //  value={contactUsForm.email} 
                    //  onChange={(event)=>setContactUsForm({...contactUsForm,email:event.target.value})}
                     />
                    <br />
                    <br />
                    {/* <label>CHoose </label>
                    <select name='Style'>
                        <optgroup label='Style from our website '>
                            <option value='1'>sedan</option>
                            <option value='2'>coupe</option>
                            <option value='3'>suv</option>
                            <option value='4'>Jeep</option>
                            <option value='5'>Mercedes</option>
                            <option value='6'>van</option>
                            <option value='7'>wagon</option>
                            <option value='8'>convertible</option>
                            <option value='9'>sports car</option>
                            <option value='10'>luxury</option>
                        </optgroup>
                        <optgroup label='Style you send us '>
                            <option value='12'>another style </option>
                        </optgroup>
                    </select> */}
                    <br />
                    <br />
                    <label htmlFor='msg'> How can we help you </label>
                    <br />
                    <br />
                    <textarea id='msg' className='text' rows={6} cols={50} placeholder='How can we help you ?'
                    ref={message}
                    //  value={contactUsForm.message} 
                    //  onChange={(event)=>setContactUsForm({...contactUsForm,message:event.target.value})}
                     ></textarea>
                    <br />
                    <input type='submit' value='Send' />
                </fieldset>
        </div>
    );
};

export default AboutPage
