const express = require("express");

const Product = require('./models/productModel')
require("dotenv").config()

const cors = require('cors')
const db = require("./db")

const app = express();
app.use(cors({
    origin:["https://lavazzamockup15.vercel.app"],
    methods:["POST","GET"],
    credentials:true}));

app.use(express.json());

const productsRoute = require('./routes/productsRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');

//const cartsRoute = require('./routes/cartsRoute');
app.use('/api/products/',productsRoute);
app.use('/api/users/',userRoute);

app.use('/api/orders/',ordersRoute);

//app.use('/api/carts/',cartsRoute);
app.get("/",async (req,res)=>{
    await res.send("server working!!!");
});

/*
app.get('/getproducts', async (req, res) => {
    try {
        const docs = await Product.find({}).exec();
        res.send(docs);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching products');
    }
});*/




app.listen(process.env.PORT, () =>`server running on port `);
