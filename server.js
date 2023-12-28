//create express application
//1.import express module
const exp = require("express");
//2.create express app
const app = exp();


//body parser
app.use(exp.json())

//sample users data
let users = [
  {
    id: 1,
    name: "kiran",
  },
  {
    id: 2,
    name: "ravi",
  },
];
//user api(REST API)

//get all users
app.get("/users", (req, res) => {
  //send users in res
  res.send({ message: "all users", payload: users });
});

//get a user by id
app.get("/users/:id", (req, res) => {
  //get url param
  let id = Number(req.params.id); //{ id : 2}
  //find user by id
  let user = users.find((userObj) => userObj.id === id);
  //send res
  if (user === undefined) {
    res.send({ message: "No user found" });
  } else {
    res.send({ message: "a user", payload: user });
  }
});







//create a user
app.post("/new-user", (req, res) => {
    //get new user obj
    let newUser=req.body;
    //insert newUser in users array
    users.push(newUser)
    //send res
    res.send({message:"New user created"})
});





















//update a user by id
app.put("/user", (req, res) => {

    //get modifieduser details
    let modifiedUser=req.body;
    //find index of user need to be modified
   let index= users.findIndex(userObj=>userObj.id===modifiedUser.id)
    //if not user found
    if(index===-1){
        res.send({message:"No user found to update"})
    }else{
        users.splice(index,1,modifiedUser)
        res.send({message:"User modified"})
    }
});








//delete a user by id
app.delete("/users/:id", (req, res) => {
    //get id from url
    let id=Number(req.params.id)
    //find index of user to be deleted
    let index= users.findIndex(userObj=>userObj.id===id)
    //if not user found
    if(index===-1){
        res.send({message:"No user found to delete"})
    }else{
        users.splice(index,1)
        res.send({message:"User deleted"})
    }
});

//assign port number to HTTP server
app.listen(4000, () => console.log("server running on port 4000..."));


