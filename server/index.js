const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductsRoutes = require('./routes/ProductsRoutes');
const OrderRoutes = require('./routes/OrderRoutes');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Product_Management", { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/auth', authRoutes);
app.use('/category', CategoryRoutes);
app.use('/product', ProductsRoutes);
app.use('/order', OrderRoutes);


app.listen(3001, ()=>{
    console.log('Server is Running..')
})

