const express=require('express');
const cors=require("cors");
// const mongoose=require("mongoose");

const app=express();
app.use(cors);

app.get('/',(req,res)=>
{
    res.send('Hello world');
})

app.listen(3001,()=>
{
    console.log("listening");
});