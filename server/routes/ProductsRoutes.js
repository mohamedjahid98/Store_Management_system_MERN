
const express = require('express');
const router = express.Router();
const ProductsModel = require('../Models/Products');


router.get('/productsdata', (req, res) => {
    ProductsModel.find({})
    .then(productsmaster=>res.json(productsmaster))
    .catch(err=>res.json(err))
});

router.get('/getproducts/:id', (req, res) => {
    const id =req.params.id;
    ProductsModel.findById({_id:id})
    .then(productsmaster=>res.json(productsmaster))
    .catch(err=>res.json(err))
});

router.post('/createproducts', (req, res) => {
    ProductsModel.create(req.body)
    .then(productsmaster=>res.json(productsmaster))
    .catch(err=>res.json(err))
});

router.put('/updateproducts/:id', (req, res) => {
    const id =req.params.id;
    ProductsModel.findByIdAndUpdate({_id:id},{
        serial_no:req.body.serial_no, asset_type:req.body.asset_type, 
        make:req.body.make, model:req.body.model, status:req.body.status,
        purchase_date:req.body.purchase_date, purchase_cost:req.body.purchase_cost
    })
    .then(productsmaster=>res.json(productsmaster))
    .catch(err=>res.json(err))
});

router.delete('/deleteproducts/:id', (req, res) => {
    const id =req.params.id;
    ProductsModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;
