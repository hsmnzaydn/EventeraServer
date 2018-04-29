var mongoose=require("mongoose");

var Schema=mongoose.Schema;


var comment = new Schema({
    _id: Schema.Types.ObjectId,
    text: String,
    postedBy: Object
})


var CommentSchema=mongoose.model('comment',comment)


module.exports= CommentSchema;