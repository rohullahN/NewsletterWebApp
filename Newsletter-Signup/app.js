const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res)
{
  res.sendFile(__dirname +"/signup.html");
});


app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/d4e3ac2e08";
  const options = {
    method: "POST",
    auth: "rohullah1:ad235198fede4aff6b6855be74fc6fbe6-us14"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode ===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/fail.html")
    }
  })

  request.write(jsonData);
  request.end();

});

app.post("/fail", function(req, res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function()
{
  console.log("server is running on port 3000");
})

//d235198fede4aff6b6855be74fc6fbe6-us14

// d4e3ac2e08
