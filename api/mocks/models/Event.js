var mongoose=require("mongoose");

var Schema=mongoose.Schema;







var event=new Schema(
    {
        eventName: String,
        eventDescription: String,
        eventStartTime: String,
        eventEndTime:String,
        eventCategoryName: String,
        eventLocation: String,
        wallEntryList: [
            {
               wallEntry:  {type: mongoose.Schema.Types.ObjectId, ref: 'wallEntry'} 
                
            }
        ]
        
    }

);

var Event=mongoose.model('events',event);

module.exports=Event;