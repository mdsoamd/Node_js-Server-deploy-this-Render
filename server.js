const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//* true - > Nested Objects (Correct)
//* false -> Nested Objects (Not Correctl)

const PORT = process.env.PORT || 4000


const db = "mongodb+srv://mdsomad:0YaroSQHFrjatTo2@cluster0.bf7qtzb.mongodb.net/notesdb";

mongoose.set('strictQuery', true);

mongoose.connect(db,{              //* <-- Yah hai MongoDB Atlas mein connect Karne Ka Tarika
   useNewUrlParser: true,
   useCreateIndex:true,
   useUnifiedTopology: true,
   useFindAndModify : false
}).then(()=>{
    console.log('MongoDB Atlas connection successfully.')
    app.get('/',(req,resp)=>{
       const response = ({message:"API Test Updata Works"});
       resp.json(response);
   });

   app.get('/notes',async(req,resp)=>{
    let notes = await Note.find();
    resp.json(notes);
 });





  app.post('/notes/list',async(req,resp)=>{
    let notes = await Note.find({userid:req.body.userid});
    resp.json(notes);
 });





  app.post('/notes/add',async(req,resp)=>{

    await Note.deleteOne({id:req.body.id});
    const newNote = new Note({
       id: req.body.id,
       userid:req.body.userid,
       title:req.body.title,
       content:req.body.content
    })
   await newNote.save();
   const response = {message:"New Note Created!"} 
    resp.json(response);
 });




 app.post('/notes/delete',async(req,resp)=>{
    await Note.deleteOne({id:req.body.id});
    const response = {message:" Note Delete!"} 
    resp.json(response);

 })
   
   
}).catch((err)=>{
     console.log("MongoDB Atlas connection failed:"+ err);
})






app.listen(PORT,()=>{
   console.log("Server Running at http://localhost:5000")
});