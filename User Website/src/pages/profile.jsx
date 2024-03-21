import { Avatar, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Profile() {
  const { id } = useParams()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileno, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
      valid = false;
    }
    if (!email) {
      errors.email = 'email is required';
      valid = false;
    } if (!password) {
      errors.password = 'Password is required';
      valid = false;
    }if (!mobileno) {
      errors.mobileno = 'Mobile is required';
      valid = false;
    }if (!address) {
      errors.address = 'Address is required';
      valid = false;
    }
    
    setErrors(errors);
    return valid;
  };

  useEffect(() => {
    console.log('Fetching user profile for id:', id);

    if (id) {
      axios.get(`http://localhost:3001/auth/getUserProfile/${id}`)
        .then(result => {
          console.log(result);
          const { username, email, password,mobileno,address} = result.data;
          setUsername(username);
          setEmail(email);
          setMobile(mobileno);
          setPassword(password);
          setAddress(address);
        })
        .catch(err => console.log(err));
    }
  }, [id]);


  const Update = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:3001/auth/updateUserProfile/${id}`, { username,mobileno, email, password,address })
        .then(result => {
          console.log(result)
          navigate('/home')
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <section className="relative block h-[30vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src="/img/team-5.png"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>

              </div>
              <div className="w-full  mt-2">
                <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">User Profile</Typography>
                </div>
                <form className="mt-8 mb-1 mx-auto w-20 max-w-screen-lg lg:w-1/2" onSubmit={Update}>
                  <div className="mb-1 flex flex-col gap-4">
                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                      Username
                    </Typography>
                    <Input
                      size="md"
                      placeholder="name@mail.com"
                      value={username} onChange={(e) => setUsername(e.target.value)}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.username && <Typography variant="small" color="red" className="font-medium">{errors.username}</Typography>}
                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                      Email
                    </Typography>
                    <Input
                      size="md"
                      placeholder="name@mail.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
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
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.password && <Typography variant="small" color="red" className="font-medium">{errors.password}</Typography>}
                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                      Mobile
                    </Typography>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="9876543210"
                      value={mobileno} onChange={(e) => setMobile(e.target.value)}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.mobileno && <Typography variant="small" color="red" className="font-medium">{errors.mobileno}</Typography>}
                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                      Address
                    </Typography>
                    <Textarea
                      size="lg"
                      placeholder="Address..."
                      value={address} onChange={(e) => setAddress(e.target.value)}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {errors.address && <Typography variant="small" color="red" className="font-medium">{errors.address}</Typography>}
                  </div>
                  <Button className="mt-6" type="submit" fullWidth>
                    Update Profile
                  </Button>

                </form>
              </div>

            </div>

          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
