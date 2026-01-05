// web application framework building server and APIs in node.js.
const express = require("express"); 
//load env variables from .env to node.js and improves security (APIS,password and etc..)
const dotenv = require("dotenv");
//allows a server to work on multiple origins
const cors =require("cors");


dotenv.config();//load environment variables from.env file

const app = express(); //creates server application
const PORT = process.env.PORT || 3000; //choose either of the port

app.use(cors());//helps to communicate frontend and backend origins safely
app.use(express.json());//parses JSON data from frontend

app.get("/",(req,res) => {
    res.send("Server is running..🚀");//response to browser or the client
});


// listen for incoming request on this port
app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);//callback function runs only once
});