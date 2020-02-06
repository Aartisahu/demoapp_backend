var express = require('express');
var app = express();
var UserRegistration= require('./model');
var bodyParser = require('body-parser'); 
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
var cors = require('cors')
app.use(cors())

app.get('/details',function(req,res){
  UserRegistration.find({}, function(err, user){  
    if(err){  
       res.json(err);  
    }  
    else{   
      console.log(user)     
       res.json(user);  
    }  
 });  
})
app.post('/registration', function(req,res){
  const {_id,file, name, phone_Number, address, email, password, dateOfBirth, security_Question, security_Answer} = req.body;
  var newRegister = new UserRegistration({
    _id,file, name, phone_Number, address, email, password, dateOfBirth, security_Question, security_Answer
  });
   newRegister.save((error, user) => {
      if (error) {
        res.send(error);
      } else if (!user) {
        res.send("Data not found");
      } else {
        res.status(200).send(user);

      }
    })
})
app.post('/login',function(req, res){
   const {email, password} = req.body
   UserRegistration.findOne({ email , password },
      (error, user) => {
         if (error) {
           res.send(error);
         } else if (!user) {
           res.status(404).send("Data not found");
         } else {
           res.status(200).send(user);
         }
      }
   )
})
app.put('/updateProfile',function(req,res){
    const {file,name, phone_Number, address, email, password, dateOfBirth, security_Question, security_Answer} = req.body;
    UserRegistration.findOneAndUpdate({email:email}, {$set:{file, name, phone_Number, address, email, password, dateOfBirth, security_Question, security_Answer}},   
      function(err, user) { 
        if (err) {  
        res.json(err);   
        }  
        else{ 
          UserRegistration.find({}, function(err, user){  
              if(err){  
                 res.json(err);  
              }  
              else{        
                 res.json(user);  
              }  
           }); 
        }  
    });  
  }   
)

app.listen(8081);