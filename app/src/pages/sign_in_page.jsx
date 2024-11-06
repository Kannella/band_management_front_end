import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign_in_page.css';
import logInSignUpImg from './assets/images/logInSignUpImg.png';

function SignInPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='screen container-fluid '>
            <div className='formPart col-5 offset-md-2 align-self-center'>
                <h1>Welcome Back</h1>
                <p>Please enter your account details</p>
                <form action="">
                    <p>Email</p>
                    <input
                        className=''
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />    
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />   
                    <br/>
                    <p>
                        <Link to="/">forgot your password?</Link>
                    </p>
                    <br/>
                    <button className='buttonLogIn' type='submit'>
                        Login
                    </button>
                </form>
                <p>Don't have an account? </p>
                <button className='noAccountButton'>
                    Sign Up
                </button>
            </div>
            <div className='photoPart col-5'>
                <img src={logInSignUpImg} alt="" />
            </div>        
        </div>
    )
}

export  default SignInPage;