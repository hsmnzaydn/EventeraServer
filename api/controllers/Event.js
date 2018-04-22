
var kullanici=require('../mocks/models/User')
var etkinlik= require('../mocks/models/Event')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')

module.exports = {attendEvent,getSpecificEventList};

function attendEvent(req,res,next){
    var id = req.swagger.params.id.value
    var udid = req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    
    kullanici.findById({_id:authorizationKeyOfUser , udid: udid},function(err,mongoUser){

        etkinlik.findById({_id:id},function(err,event){
            
            mongoUser.attendes.push(event)
            
            mongoUser.save(function(err) {
                if(err){
                    jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                        res.status(callback.code)
                        res.send(callback.message)
                    })
                }
                else{
                    jsonCreator.commonResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,function(callback){
                        res.status(callback.code)
                        res.send(callback)
                    })
                }
            });
            
        })
    })
}





function getSpecificEventList(req,res,next){
    var udid= req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
        
    var listOfEventName=[]
    var listOfEvent=[]
    kullanici.find({udid: udid, _id:authorizationKeyOfUser}, function(err,mongoUser){
       if(err) {
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            });
        }
        if(mongoUser.length != 0){
            listOfEventName=mongoUser[0].interesting
            
            for(let i=0; i<listOfEventName; i++){
                etkinlik.find({eventName:listOfEventName[i]},function(err,eventList){
                    console.log("EventName: "+ listOfEventName[i])
                    console.log("EventList: "+ eventList)
                    console.log(listOfEvent)
                    console.log("*****************************************\n")
                    if(err) {
                        jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        });
                    }
                    if(eventList.length != 0){
                        listOfEvent.push(eventList)
                    }
                })
            }

        }

    })

    
    
}




