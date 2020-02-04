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
    const accountSid = 'PUT YOUR ACCOUNT SID HERE';
    const authToken = 'PUT HERE YOUR AUTHTOKEN HERE';
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
      .create({
         body: `${req.body.firstName} ${req.body.lastName} Message :${req.body.message}`,
         from: 'PUT YOUR TRIAL NUMBER HERE',
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