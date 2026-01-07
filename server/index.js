// web application framework building server and APIs in node.js.
const express = require("express"); 
//load env variables from .env to node.js and improves security (APIS,password and etc..)
const dotenv = require("dotenv");
//allows a server to work on multiple origins
const cors =require("cors");

const pool=require("./DB/db");


dotenv.config();//load environment variables from.env file

const app = express(); //creates server application
const PORT = process.env.PORT || 3000; //choose either of the port

app.use(cors());//helps to communicate frontend and backend origins safely
app.use(express.json());//parses JSON data from frontend

app.get("/",(req,res) => {
    res.send("Server is running..🚀");//response to browser or the client
});

//Dummy users data as temporary
let users = [
    {id:1,name:"madhu",email:"madhu@mail.com"},
    {id:2,name:"john",email:"john@gmail.com"}
];

//To get all users through postman
// app.get("/users",(req,res)=>{
//     res.status(200).json(users);
// });

//To get data through BD
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//POST new user
app.post("/users",(req,res)=>{
    const newUser={
        id:users.length+1,
        ...req.body //update the of the specific field
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//UPDATE new User
app.put("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id ===id);

    if(userIndex===-1){
        return res.status(404).json({message:"user not found"})
    }

    users[userIndex]={
        ...users[userIndex], //old data
        ...req.body // updated data of specific field mentioned
    };

    res.status(200).json(users[userIndex]);
});

//DELETE user
app.delete("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    users= users.filter(user =>user.id !=id);
    res.status(200).json({message:"User deleted"});
});

// listen for incoming request on this port
app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);//callback function runs only once
});