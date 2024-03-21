import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } if (!username) {
      errors.username = 'Username is required';
      valid = false;
    } if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        errors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.';
        valid = false;
      }
    }
    if (!confirmpassword) {
      errors.confirmpassword = 'Confirm Password is required';
      valid = false;
    } else if (password !== confirmpassword) {
      errors.confirmpassword = 'Passwords do not match';
      valid = false;
    }
    setErrors(errors);
    return valid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/auth/signup', { username, email, password, confirmpassword })
        .then((result) => {
          console.log('Signup submitted:', result);
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Full Name
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Jahid"
              onChange={(e) => setUsername(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          {errors.username && <Typography variant="small" color="red" className="font-medium">{errors.username}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com" 
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && <Typography variant="small" color="red" className="font-medium">{errors.email}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && <Typography variant="small" color="red" className="font-medium">{errors.password}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
         {errors.confirmpassword && <Typography variant="small" color="red" className="font-medium">{errors.confirmpassword}</Typography>}

          </div>

          <Button className="mt-6" type="submit" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
