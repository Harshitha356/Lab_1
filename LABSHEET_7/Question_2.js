const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ---------------- MongoDB ----------------
mongoose.connect("mongodb://127.0.0.1:27017/bookDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ---------------- Model ----------------
const Book = mongoose.model("Book",{
 title:String,
 author:String,
 category:String,
 price:Number,
 rating:Number,
 year:Number
});

// ---------------- Home ----------------
app.get("/",(req,res)=>{
 res.send("Server Running ✅");
});

// ---------------- Add Sample Data ----------------
app.get("/addsample", async(req,res)=>{

 await Book.deleteMany({});

 await Book.insertMany([
  {title:"JavaScript Essentials",author:"John Smith",category:"Programming",price:450,rating:4.5,year:2023},
  {title:"MongoDB Guide",author:"Sam",category:"Database",price:500,rating:4.2,year:2022},
  {title:"Python Basics",author:"Alex",category:"Programming",price:300,rating:4.7,year:2021}
 ]);

 res.send("Sample Books Added ✅");
});

// ---------------- Get Books ----------------
app.get("/books", async(req,res)=>{
 const books = await Book.find();
 res.json(books);
});

// ---------------- Server ----------------
app.listen(5000,()=>{
 console.log("Server running on port 5000");
});