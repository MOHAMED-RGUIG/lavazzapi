const express = require('express');
const router = express.Router();
const Order =require('../models/orderModel')

router.post("/placeorder",async (req,res)=>{
  
try {
    const {subtotal , currentUser, cartItems,codeClient,raisonSocial,adresse,tel,emailClt,comment} = req.body;

    const neworder = new Order({ 
        name:currentUser[0].name,
         email:currentUser[0].email,
         userid:currentUser[0]._id,
         orderItems:cartItems,
         orderAmount:subtotal,
         codeClient:codeClient,
         raisonSocial:raisonSocial,
         adresse:adresse,
         tel:tel,
         emailClt:emailClt,
         comment:comment
        });
    await neworder.save();

    res.status(201).send('Order registered successfully');
    res.send(neworder);

}catch(error){
    return res.status(400).json({message:'something went wrong'});
}

})

router.post('/getuserorders', async (req,res)=>{
    const {userid} = req.body

    try {
        const orders = await Order.find({userid: userid})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message: 'somthing went wrong'})
    }
})
router.get('/getallorders', async (req,res)=>{
   

    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message: 'somthing went wrong'})
    }
})




module.exports = router