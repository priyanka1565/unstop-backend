const express = require("express");
const SeatRouter = require("./routes/SeatRoute");
const app = express()
const connect = require("./connection/database")
const cors = require("cors");

// GLOBAL MIDDLEWARE 
app.use(express.json());
app.use(cors())

require("dotenv").config;

app.use("/book-my-seat", SeatRouter); 

const url = process.env.LOCAL_URL;
const Port = process.env.PORT ? process.env.PORT : 5000

app.listen(Port, async() => {
    try {
        await connect.connect()
        console.log("Database connected successfully!")
         console.log(`app is running on ${url}:${Port}`);
        
    }
    catch (error) {
   console.log("error",error)
        
    }
   

});
