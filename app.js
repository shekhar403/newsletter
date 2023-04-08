// Requiring MailChimp's module
// For this we need to install the npm module @mailchimp/mailchimp_marketing. 
// To do that we write:
// npm install @mailchimp/mailchimp_marketing
 
const mailchimp = require("@mailchimp/mailchimp_marketing");
// Your previous code
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()

console.log(process.env.S3_BUCKET);
console.log("process.env");
 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));
 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", function(req, res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
 
//Setting up MailChimp
    mailchimp.setConfig({
//write your api key 
      apiKey: process.env.APP_KEY,
//and server prefix
      server: process.env.SERVER,
    });
    
// write your audience/list_id here
    const list_id = process.env.LIST_ID;
 
// All the below code are from mailchimp docs
    const run = async () => {
        const response = await mailchimp.lists.batchListMembers(list_id, {
          members: [{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName
            }
          }],
        });
        
        if (response.errors.length === 0) {
            // res.send(response.new_members[0].status);
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
      };
      
      run();   
});
 
app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(3000, function(){
    console.log('server is running at 3000');
});