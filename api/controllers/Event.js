var User=require('../mocks/models/User')
var etkinlik= require('../mocks/models/Event')

var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var WallEntrySchema= require('../mocks/models/WallEntrySchema')
var Utils=require('../helpers/Utils')



module.exports = {wallEntryAdd,attendEvent,getWallEntries,getEventList,isAttend};
var eventId=0
function attendEvent(req,res,next){
    var id = req.swagger.params.id.value
    var udid = req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    
    User.findById({_id:authorizationKeyOfUser , udid: udid},function(err,mongoUser){

        etkinlik.findById({_id:id},function(err,event){
            mongoUser.attendes.push(event)
            
            mongoUser.save(function(err) {
                if(err){
                    jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                        res.status(callback.code)
                        res.send(callback)
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


function isAttend(req,res,next){

    var udid=req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var id = req.swagger.params.id.value

    User.findOne({udid:udid,_id:authorizationKeyOfUser},function(err,user){
        if(err){
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                console.log(err)
                res.status(callback.code)
                res.send(callback)
            })
            
        }else{

            etkinlik.findOne({_id:id},function(err,event){
                if(err){
                    jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                        console.log(err)
                        res.status(callback.code)
                        res.send(callback)
                    })  
                }else{
                    let result= user.attendes.filter(attend => attend._id.toString() === id);
                    if(result.length != 0){
                        jsonCreator.commonResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        }) 
                    }else{
                        jsonCreator.commonResponseCreator(Constants.UNREGISTER_CODE,Constants.UNREGISTER_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        })
                    }
                }
            })
           

            }
        

    })



}




function getEventList(req,res,next){
    var udid=req.headers['udid']
var authorizationKeyOfUser= req.headers['authorization']
User.findOne({udid: udid, _id:authorizationKeyOfUser}, function(err,mongoUser){
    if(mongoUser){

        let listOfInterest =mongoUser.interesting.map(value => value.name)
        
        etkinlik.find({$or:[{"eventCategoryName":{"$in":listOfInterest}}]},(err,eventList)=>{
            if(err){
                console.log(err)
            }
            if(eventList.length != 0){
                    
                res.status(Constants.OK_CODE)
                    res.send(eventList)
            }
        })
    }
      
   
   })
}

function wallEntryAdd(req,res,next){
   var udid=req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var id = req.swagger.params.id.value


    etkinlik.findById({_id:id},function(err,event){

        if(err){
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{
            User.findOne({_id:authorizationKeyOfUser,udid:udid},function(err,user){
                if(err){
                    jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                        res.status(callback.code)
                        res.send(callback)
                    })
                }
                else{
                   
                    var wallEntry= new WallEntrySchema({
                        postedBy:user,
                        text: req.body['text'],
                        eventId:event._id,
                        comment:[]
                        }
                    )

                    event.wallEntryList.push(wallEntry)

                    event.save(function(err){
                        if(err){
                            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                                res.status(callback.code)
                                res.send(callback)
                            })
                        }else{
                            jsonCreator.commonResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,function(callback){
                                res.status(callback.code)
                                res.send(callback)
                            })
                        }
                    })


                }  
            })
        }

        



    })




}


function getWallEntries(req,res,next){
   
    var id = req.swagger.params.eventId.value

    etkinlik.findOne({_id:id},function(err,event){
        if(err){
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{
           
           res.status(Constants.OK_CODE)
           res.send(event.wallEntryList.reverse())
        }

    })

 


}









