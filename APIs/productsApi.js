//create a mini-express app
const exp=require('express')
const productApp=exp.Router()


productApp.get('/products',(req,res)=>{
    res.send({message:'all products'})
})
productApp.post('/new-product',(req,res)=>{})



//expoer prouctApp
module.exports=productApp