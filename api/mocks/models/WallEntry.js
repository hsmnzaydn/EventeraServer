var mongoose=require("mongoose");

var Schema=mongoose.Schema;


var wallEntry=new Schema(
    {
        content: String,
        likeCount: Number,
        comment: Array
        
    }

);



var WallEntry=mongoose.model('wallEntry',wallEntry);

module.exports=WallEntry;