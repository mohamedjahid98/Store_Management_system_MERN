const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    serial_no: Number,
    asset_type: String,
    make: String,
    model: String,
    status: String,
    purchase_date: Date,
    purchase_cost: Number
});



const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
