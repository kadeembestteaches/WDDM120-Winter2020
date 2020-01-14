/*
    1. Create a Web Server  that listens to HTTP request
    2. Code our Web Server to respond to specific HTTP Request
    3. Generate response to our client

*/


//import express into our file
const express = require("express");


//create express app object
const app = express();




app.get("/",(req,res)=>{
    
    let htmlPage =
    `
        <!DOCTYPE html>
        <html>
            <head>
                <title>About Us </title>
                <meta charset="UTF-8">
            </head>
            <body>
                <h2> Home page </h2>
                <p>
                    Home
                </p>
            </body>
        </html>
    `

    res.send(htmlPage);

});


app.get("/about",(req,res)=>{


    let htmlPage =
    `
        <!DOCTYPE html>
        <html>
            <head>
                <title>About Us </title>
                <meta charset="UTF-8">
            </head>
            <body>
                <h2> About Us page </h2>
                <p>
                    Testing
                </p>
            </body>
        </html>
    `
    res.send(htmlPage);
});



app.get("/product",(req,res)=>{ 
    
    //fake database
    const products = 
[
    {
        title  : "Iphone",
        price : 1500
    }
    ,
    {
        title: "Airpods",
        price : 250

    }
    ,
    {
        title : "Charger",
        price : 150
    }
    
];

    let urlString=``;
    products.forEach(prod => {
         urlString+= `<li> ${prod.title}</li>
                        <li> ${prod.price}</li>` ;

    
    });
    

    const htmlPage=
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Product</title>
    </head>
    <body>
            <ul> ${urlString} </ul>
        
    </body>
    </html>
    `;

    res.send(htmlPage);




})



//This creates a web server!!!!!!
app.listen(3000,()=>{

    console.log(`Web Server connected!!!`);
})