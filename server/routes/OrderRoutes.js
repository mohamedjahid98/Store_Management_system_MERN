
const express = require('express');
const router = express.Router();
const OrdersModel = require('../Models/Order');


router.get('/ordersdata', (req, res) => {
    OrdersModel.find({})
    .then(ordersmaster=>res.json(ordersmaster))
    .catch(err=>res.json(err))
});

router.get('/getorders/:id', (req, res) => {
    const id =req.params.id;
    OrdersModel.findById({_id:id})
    .then(ordersmaster=>res.json(ordersmaster))
    .catch(err=>res.json(err))
});

router.post('/createorders', (req, res) => {
    const currentDate = Date.now(); 
    const orderData = { ...req.body, order_date: currentDate }; 
    OrdersModel.create(orderData)
    .then(ordersmaster => res.json(ordersmaster))
    .catch(err => res.json(err))
});


router.put('/updateorders/:id', (req, res) => {
    const id =req.params.id;
    OrdersModel.findByIdAndUpdate({_id:id},{
        status:req.body.status      
    })
    .then(ordersmaster=>res.json(ordersmaster))
    .catch(err=>res.json(err))
});

router.delete('/deleteorders/:id', (req, res) => {
    const id =req.params.id;
    OrdersModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;
