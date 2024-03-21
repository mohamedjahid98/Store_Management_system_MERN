const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username: String,
    asset_type: String,
    make: String,
    model: String,
    status: String,
    purchase_cost: Number,
    order_date: { type: Date, default: Date.now } // Adding order_date with default value

});



const Orders = mongoose.model('Orders', OrderSchema);

module.exports = Orders;
