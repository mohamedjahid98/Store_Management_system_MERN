import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        let valid = true;
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
            valid = false;
        } if (!password) {
            errors.password = 'Password is required';
            valid = false;
        }
        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Login submitted:', email, password);
            fetch('http://localhost:3001/auth/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('email', data.user.email);
                        localStorage.setItem('ID', data.user._id);
                        // Show SweetAlert2 success popup for successful login
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            text: 'You have successfully logged in!',
                        }).then(() => {
                            navigate('/home');
                        });
                    } else {
                        setError('Invalid Email or Password');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };
    return (
        <div className='bgcolor' style={{ width: '519%' }}><br />
            <h1 style={{ textAlign: 'center', color: "white" }}>Login</h1>
            <div className="card-box-1" style={{ marginTop: '10%' }}>
                {error && <div style={{ textAlign: 'center', color: "red" }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='admin@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    <br />
                    <label>Password:</label>
                    <div className='input-group'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Admin123'
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn btn-outline-primary' type='button'
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <i className='fas fa-eye'></i>
                            ) : (
                                <i className='fas fa-eye-slash'></i>
                            )}
                        </button>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-8'>
                            <button className='btn btn-success' type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}

export default Login
