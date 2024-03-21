const express = require('express');
const router = express.Router();
const SignupModel = require('../Models/Signup');

router.post('/signup', (req, res) => {

    const currentDate = Date.now(); 
    const orderData = { ...req.body, signup_date: currentDate }; 
    SignupModel.create(orderData)
    .then(ordersmaster => res.json(ordersmaster))
    .catch(err => res.json(err))
});

router.get('/signupdata', (req, res) => {
    SignupModel.find({})
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.get('/getUserProfile/:id', (req, res) => {
    const id =req.params.id;
    SignupModel.findById({_id:id})
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.put('/updateUserProfile/:id', (req, res) => {
    const id =req.params.id;
    SignupModel.findByIdAndUpdate({_id:id},{username:req.body.username, email:req.body.email, password:req.body.password,
        address:req.body.address, mobileno:req.body.mobileno})
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SignupModel.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: 'Login successful', user: user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

const defaultEmail = 'admin@gmail.com';
const defaultPassword = 'Admin123';

router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
    if (email === defaultEmail && password === defaultPassword) {
        res.json({ success: true, message: 'Login successful', user: { email: defaultEmail } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

module.exports = router;
