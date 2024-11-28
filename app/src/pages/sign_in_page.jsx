import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign_in_page.css';
import {logInSignUpImg} from './assets/images/logInSignUpImg.png'

function SignInPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='screen container-fluid '>
            <div className='formPart col-3 offset-md-2 align-self-center'>
                <h1>Welcome Back</h1>
                <p>Please enter your account details</p>
                <form action="">
                    <p>Email</p>
                    <input
                        className='input'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />    
                    <p>Password</p>
                    <input
                        className='input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />   
                    <Link className="noPassword" to="/">forgot your password?</Link>
                    <br />
                    <button className='buttonLogIn' type='submit'>
                        Login
                    </button>
                </form>
                <br />
                <div className='noAccountPart'>
                    <p>Don't have an account? </p>
                    <button className='noAccountButton'>
                        Sign Up
                    </button>
                </div>
            </div>
            <div className='division col-2'></div>

            <div className='photoPart col-5'>
            </div>        
        </div>
    )
}

export  default SignInPage;