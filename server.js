//create express application
//1.import express module
const exp = require("express");
//2.create express app
const app = exp();

//import userApp and productApp
const userApp=require('./APIs/userApi')
const productApp=require('./APIs/productsApi')

//forward req to userApp if path starts with '/user-api'
app.use('/user-api',userApp)
//forward req to productApp if path starts with '/product-api'
app.use('/product-api',productApp)

//error handling middleware
app.use((err, req, res, next) => {
  res.send({ errMessage: err.message });
});

//assign port number to HTTP server
app.listen(4000, () => console.log("server running on port 4000..."));
