import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign_in_page.css';
import imgLogInSignUp from '../assets/images/imgLogInSignUp.png';


function SignUpPage() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hasCar, setHasCar] = useState('');
    const [beMusician, setBeMusician] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    return (
        <div className='screen container-fluid'> 
            <div className='photoPart col-5'>
                <img className='photoBandManager' src={imgLogInSignUp} alt="" />
            </div>

            <div className='formPart col-5 offset-md-1 align-self-center'>
                <div className='text-center'>
                    <h1 className=''>Create an account</h1>
                    <div className='row'>
                        <p className='subheadline col'>Already have an account?    
                        <Link className="hasLogIn col" to="/login">Login</Link>
                        </p>              
                    </div>
                </div>
                <form action="">
                    <p className='pSignUp'>Personal Information:</p>                  
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />  
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />  
                    </div>
                    <div className='row align-items-center'>
                        <div className='row'>
                            <div className='row justify-content-between'>
                                <p className='pFourColumns col'>Do you have a Car?</p>
                                <label className="custom-checkbox col">
                                    <input 
                                        type="checkbox" 
                                        className="checkBox" 
                                        checked={hasCar}
                                        onChange={(e) => setHasCar(e.target.checked)}
                                        required
                                    />
                                    <span className="checkmark"></span>
                                </label>                              
                            </div>
                            <div className='row justify-content-between'>
                                <p className='pFourColumns col'>Are you a Manager?</p>
                                <label className="custom-checkbox col">
                                    <input 
                                        type="checkbox" 
                                        className="checkBox" 
                                        checked={beMusician}
                                        onChange={(e) => setBeMusician(e.target.checked)}
                                        required
                                    />
                                    <span className="checkmark"></span>
                                </label>                            
                            </div>
                        </div>
                    </div>
                    <p className='pSignUp'>Contact Details:</p>                        
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />  
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />  
                    </div>
                    <p className='pSignUp'>Location:</p>                        
   
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />                        
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='house number'
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                            required
                        />  
                    </div>       
                    <p className='pSignUp'>Password:</p>                        
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="password"
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />  
                    </div>  
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="password"
                            placeholder='confirm your password'
                            value={passwordConfirmed}
                            onChange={(e) => setPasswordConfirmed(e.target.value)}
                            required
                        />  
                    </div>     
                    <br />
                    <div className='row '>
                        <button className='submitButton' type='submit'>
                            Create Account
                        </button>
                    </div>        
                </form>
            </div>
        </div>

    )
}

export default SignUpPage;
