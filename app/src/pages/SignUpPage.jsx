import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/User/sign_in_page.css';
import imgLogInSignUp from '../assets/images/imgLogInSignUp.png';


function SignUpPage() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hasCar, setHasCar] = useState('');
    const [beMusician, setBeMusician] = useState(2);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullName = `${name} ${lastName}`;
    
        const dataToSend = {
            name: fullName,
            email: email,
            password: password,
            role: beMusician, 
            phoneNumber: phone,
            hasCar: hasCar,
            HomeAdress: address,
        };

        setIsLoading(true);
        setError(null);

        try {

            const response = await axios.post('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User/CreateUser', dataToSend);


            if (response.status === 200) {
                alert('User successfully created! Redirecting to login page...');
                navigate('/login'); 
            } else {
                alert('Error creating user!');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert('Error during registration!');
        }
    };

    return (
        <div className='screen container-fluid'> 
            <div className='photoPart col-5'>
                <img className='photoBandManager' src={imgLogInSignUp} alt="" />
            </div>

            <div className='formPart col-5 offset-md-1 align-self-center'>
                <div className='text-center'>
                    <h1>Create an account</h1>
                    <div className='row'>
                        <p className='subheadline col'>Already have an account?    
                        <Link className="hasLogIn col" to="/login">Login</Link>
                        </p>              
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <p className='pSignUp'>Personal Information:</p>                   
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='First Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />  
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='Last Name'
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
                                        checked={hasCar === true}
                                        onChange={(e) => setHasCar(e.target.checked ? true : false)}
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
                                        checked={beMusician === 1}
                                        onChange={(e) => setBeMusician(e.target.checked ? 1 : 2)}
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
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />  
                        <input
                            className='inputSignUp col'
                            type="text"
                            placeholder='Phone'
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
                            placeholder='Enter your full address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        />  
                    </div>       
                    <p className='pSignUp'>Password:</p>                        
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />  
                    </div>  
                    <div className='row'>
                        <input
                            className='inputSignUp col'
                            type="password"
                            placeholder='Confirm Password'
                            value={passwordConfirmed}
                            onChange={(e) => setPasswordConfirmed(e.target.value)}
                            required
                        />  
                    </div>     
                    <br />
                    <div className='row'>
                        <button className='submitButton' type='submit' disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>           
                </form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
}

export default SignUpPage;
