var mongoose=require("mongoose");

var Schema=mongoose.Schema;


var comment = new Schema({
    _id: Schema.Types.ObjectId,
    text: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'} 
})


var CommentSchema=mongoose.model('comment',comment)


module.exports= CommentSchema;