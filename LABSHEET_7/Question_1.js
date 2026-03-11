const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
.then(()=>console.log("MongoDB Connected"));

// Schema
const Note = mongoose.model("Note", {
  title: String,
  subject: String,
  description: String
});


// ---------- CRUD ----------

// Add Note
app.post("/notes", async (req,res)=>{
  const note = new Note(req.body);
  await note.save();
  res.send("Note Added");
});

// View Notes
app.get("/notes", async (req,res)=>{
  const notes = await Note.find();
  res.json(notes);
});

// Update Note
app.put("/notes/:id", async (req,res)=>{
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.send("Note Updated");
});

// Delete Note
app.delete("/notes/:id", async (req,res)=>{
  await Note.findByIdAndDelete(req.params.id);
  res.send("Note Deleted");
});

// Server
app.listen(5000, ()=>{
  console.log("Server running on port 5000");
});