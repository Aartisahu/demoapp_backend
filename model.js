var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demodb',{
  useNewUrlParser: true ,
  useUnifiedTopology: true ,
  

});
var UserRegistration = new mongoose.Schema({
  file: String,
  name:String,
  phone_Number: { type: Number },
  address: String,
  email:{ type: String, unique: true},
  password:{ type: String },
  dateOfBirth: { type: Date },
  security_Question: String,
  security_Answer: String
});

module.exports = mongoose.model("registration", UserRegistration);;
