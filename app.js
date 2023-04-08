// Requiring MailChimp's module
// For this we need to install the npm module @mailchimp/mailchimp_marketing. 
// To do that we write:
// npm install @mailchimp/mailchimp_marketing
 
const mailchimp = require("@mailchimp/mailchimp_marketing");
// Your previous code
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));
 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", function(req, res){
//     var fName = req.body.fName;
//     var lName = req.body.lName;
//     var email = req.body.email;
 
// //Setting up MailChimp
//     mailchimp.setConfig({
// //write your api key 
//       apiKey: "41dbc74600d116fc5d2e83f3a760db18-us21",
// //and server prefix
//       server: "us21",
//     });
    
// // write your audience/list_id here
//     const list_id = "cc951b2e83";
 
// // All the below code are from mailchimp docs
//     const run = async () => {
//         const response = await mailchimp.lists.batchListMembers(list_id, {
//           members: [{
//             email_address:email,
//             status:"subscribed",
//             merge_fields:{
//                 FNAME:fName,
//                 LNAME:lName
//             }
//           }],
//         });
        
//         if (response.errors.length === 0) {
//             // res.send(response.new_members[0].status);
//             res.sendFile(__dirname + "/success.html");
//         }
//         else {
//             res.sendFile(__dirname + "/failure.html");
//         }
//       };
      
//       run();   
res.sendFile(__dirname + "/success.html");
});
 
app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(3000, function(){
    console.log('server is running at 3000');
});