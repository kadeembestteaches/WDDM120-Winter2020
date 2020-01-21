const express = require("express");
const exphbs  = require('express-handlebars');


const app = express();

//This allows express to make my static content avialable from the public
app.use(express.static('public'))



//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set up routes
app.get("/",(req,res)=>{

    res.render("index",{
        title: "Home",
        headingInfo : "Home Page",
        randomContent: "BLAH BLAH BLHA"
    })
});

app.get("/contact-us",(req,res)=>{

    res.render("contactus",{
        title: "Contact Us",
        headingInfo : "Contact Us Page",

    });


});

app.get("/products",(req,res)=>{


    const fakeDB= [];

    fakeDB.push({title:'XPS 13',description:`Our smallest 13-inch laptops feature a virtually 
    borderless InfinityEdge display and up to 10th gen Intel® processors. 
    Touch, silver, rose gold and frost options available
    `,price:`1349.99`});

    fakeDB.push({title:'XPS 15',description:`Powerhouse performance with the latest processors and NVIDIA 
    graphics paired with a stunning 4K Ultra HD display.`,price:`1749.99`});

    fakeDB.push({title:'XPS 17',description:`XPS 17 is designed to keep you entertained for more than 9 hours 
    with a 9-cell battery upgrade.`,price:`1949.99`});


    res.render("products",{
        title: "Products",
        headingInfo : "Products Page",
        products : fakeDB

    });
});

const PORT=3000;
app.listen(3000,()=>{

    console.log(`Web server is up and running`)
})