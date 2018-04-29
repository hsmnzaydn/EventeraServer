var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var wallEntry= new Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'event', default: null} ,
    text: String,
    likeCount: {type: Number, default: 0},
    comment:[
        {
            comment: {type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: null} 
        }
    ]
})

var WallEntry=mongoose.model('wallEntry',wallEntry)


module.exports= WallEntry