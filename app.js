const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;



app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get("/",(req,res)=>{
    res.render("home", {
        title: "Home Page",
        
    });
    
})
app.get("/sendMessage",(req,res)=>{
    res.render("form",{
        title:"SMS Page"
    });
    
});


app.post("/sendMessage",(req,res)=>{

    const errors= [];

  if(req.body.phoneNo=="")
  {
    errors.push("Sorry, you must enter a phone number");

  }

  if(req.body.message=="")
  {
    errors.push("Sorry, youmust enter a  message")
  }


  if(errors.length > 0)
  {
    res.render("form",{
      messages : errors
    })
  }
  else
  {
    const accountSid = 'ACd9960b60fea322d87450929d201b6a27';
    const authToken = '86b774d0d931d9bb5eee79f3e137c464';
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
      .create({
         body: `${req.body.firstName} ${req.body.lastName} Message :${req.body.message}`,
         from: '+12604402710',
         to: `${req.body.phoneNo}`
       })
      .then(message => {
        console.log(message.sid);
        res.render("home");
      })
      .catch((err)=>{
          console.log(`Error ${err}`);
      })

  }



});


app.listen(3000, () => {
    console.log('web app is up and running on port')
})