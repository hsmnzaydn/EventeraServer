var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var wallEntry = new Schema(
    {
        text: String,
         
    }
);
var event=new Schema(
    {
        eventName: String,
        eventDescription: String,
        eventStartTime: String,
        eventEndTime:String,
        eventCategoryName: String,
        eventLocation: String,
        wallEntryList: {type: Array, type: wallEntry }
        
    }

);



var Event=mongoose.model('events',event);

module.exports=Event;