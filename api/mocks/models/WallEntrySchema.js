var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var wallEntry= new Schema({
    postedBy:  Object ,
    text: String,
    likeCount: {type: Number, default: 0},
    comment:[
        
    ]
})

var WallEntry=mongoose.model('wallEntry',wallEntry,'wallEntries')


module.exports= WallEntry