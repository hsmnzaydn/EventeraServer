var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var kullanici=new Schema(
    {
        name: String,
        udid: String,
        job: String,
        sex: String,
        location: String,
        age: Number,
        mail: String,
        interesting: {type: Array},
        attendes: {type: Array}
    }

);



var User=mongoose.model('user',kullanici);

module.exports=User;