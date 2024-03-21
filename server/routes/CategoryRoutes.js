const express = require('express');
const router = express.Router();
const CategoryModel = require('../Models/Category');

router.get('/categorydata', (req, res) => {
    CategoryModel.find({})
    .then(assetscategorys=>res.json(assetscategorys))
    .catch(err=>res.json(err))
});

router.get('/getCategory/:id', (req, res) => {
    const id =req.params.id;
    CategoryModel.findById({_id:id})
    .then(assetscategorys=>res.json(assetscategorys))
    .catch(err=>res.json(err))
});

router.post('/createCategory', (req, res) => {
    CategoryModel.create(req.body)
    .then(assetscategorys=>res.json(assetscategorys))
    .catch(err=>res.json(err))
});

router.put('/updateCategory/:id', (req, res) => {
    const id =req.params.id;
    CategoryModel.findByIdAndUpdate({_id:id},{
        categoryname:req.body.categoryname
        })
    .then(assetscategorys=>res.json(assetscategorys))
    .catch(err=>res.json(err))
});

router.delete('/deleteCategory/:id', (req, res) => {
    const id =req.params.id;
    CategoryModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;