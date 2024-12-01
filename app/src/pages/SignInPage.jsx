import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/User/sign_in_page.css';
import imgLogInSignUp from '../assets/images/imgLogInSignUp.png';
import { useAuthStore } from '../store/authStore';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const buttonSignUp = () => {
        navigate('/registration');  
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    

        try {
            const response = await fetch('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/user/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.userId, data.role);
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };
    return (
        <div className='screen container-fluid'>
            <div className='formPart col-3 offset-md-2 align-self-center'>
                <h1>Welcome Back</h1>
                <p>Please enter your account details</p>
                {error && (
                    <div className="error-message alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input
                        className='inputLogIn'
                        type="email"
                        placeholder='name@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />    
                    <p>Password</p>
                    <input
                        className='inputLogIn'
                        type="password"
                        placeholder='****'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />   
                    <div className="noPassword mt-4">Forgot your password?</div>
                    <br />
                    <button className='submitButton' type='submit'>
                       Log In
                    </button>
                </form>
                <br />
                <div className='noAccountPart'>
                    <p>Don't have an account? </p>
                    <button className='noAccountButton' onClick={buttonSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>
            <div className='division col-2'></div>

            <div className='photoPart col-5'>
                <img className='photoBandManager' src={imgLogInSignUp} alt="Band manager illustration" />
            </div>        
        </div>
    )
}

export default SignInPage;