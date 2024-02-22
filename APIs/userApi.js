//create min-express app
const exp=require('express');
const userApp=exp.Router()

const bcryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')



//body parser
userApp.use(exp.json());


//user api(REST API)

//get all users
userApp.get("/users", async(req, res) => {

    //get usersCollectionObject from express obj
   const usersCollectionObject= req.app.get('usersCollectionObject')
    //GET USERS DOCUMENTS FROM DB
   let usersList= await usersCollectionObject.find().toArray()
   
    //SEND RES
    res.send({message:"all users",payload:usersList})
});



//get a user by username
userApp.get("/users/:username", async(req, res) => {
     //get usersCollectionObj from express app
     const usersCollectionObject= req.app.get('usersCollectionObject')
     //get username from url param
     let usernameFromUrl=req.params.username
     //secrh in db for user
     let userFromDb=await usersCollectionObject.findOne({username:usernameFromUrl})
     //send res
     res.send({message:"user",payload:userFromDb})
  
});




//create a user
userApp.post("/new-user", async(req, res) => {
    //get usersCollectionObj from express app
    const usersCollectionObject= req.app.get('usersCollectionObject')
    //get user from req
    let newUser=req.body;
    //check duplicate user by username
    let dbuser=await usersCollectionObject.findOne({username:newUser.username})
    //if user found
    if(dbuser!==null){
        res.send({message:"User already existed"})
    }else{
    //hash password
     let hashedPassword=   await bcryptjs.hash(newUser.password,6)
     //replace plain password with hashed pw
     newUser.password=hashedPassword;
    //save user in db
    await usersCollectionObject.insertOne(newUser)
    //send res to client
    res.send({message:"New User created"})
    }
    
});


//user login route
userApp.post('/login',async(req,res)=>{

    //get user coll obj
    const usersCollectionObject= req.app.get('usersCollectionObject')
    //get user cred obj from client
    const userCredObj=req.body;
    //verify username
    let dbuser=await usersCollectionObject.findOne({username:userCredObj.username})
    //if user not found
    if(dbuser===null){
        res.send({message:"Invalid username"})
    }else{
         //verify password
        let status=await bcryptjs.compare(userCredObj.password,dbuser.password)
        //if passwords arev not matched
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            //create JWT token
        let encodedToken=  jwt.sign({username:dbuser.username},'abcdef',{expiresIn:20})
            //send token to client
            res.send({message:"login success",token:encodedToken,user:dbuser})
        }
    }
   
    

})











//update a user by username
userApp.put("/user", async(req, res) => {
     //get usersCollectionObj from express app
     const usersCollectionObject= req.app.get('usersCollectionObject')
     //get mnodified resource from client
     let modifiedUser=req.body;
     //uopdate in db
    await usersCollectionObject.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
    //send res
    res.send({message:"User modified"})
});

//delete a user by id
userApp.delete("/users/:username", async(req, res) => {
    //get usersCollectionObj from express app
    const usersCollectionObject= req.app.get('usersCollectionObject')
     //get username from url param
     let usernameFromUrl=req.params.username
     //delete user by username from db
    let dbres= await usersCollectionObject.deleteOne({username:usernameFromUrl})
    
     //send res
     if(dbres.deletedCount===1){
     res.send({message:"User removed"})
     }
});


//export userApp
module.exports=userApp;