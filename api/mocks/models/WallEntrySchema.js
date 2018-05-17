var mongoose=require("mongoose");

var Schema=mongoose.Schema;



var wallEntry= new Schema({
    id:Schema.Types.ObjectId,
    postedBy:  Object ,
    eventId: String,
    text: String,
    likeCount: {type: Number, default: 0},
    liked: {type:Boolean,default: false},
    byLiked:[
        {
                Object
        }
    ],
    comment:[
        {
            postedBy: Object,
            text: String
        }
    ]
})

var WallEntry=mongoose.model('wallEntry',wallEntry,'wallEntries')


module.exports= WallEntry