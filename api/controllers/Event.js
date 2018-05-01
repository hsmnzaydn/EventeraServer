var user=require('../mocks/models/User')
var etkinlik= require('../mocks/models/Event')

var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var WallEntrySchema= require('../mocks/models/WallEntrySchema')




module.exports = {wallEntryAdd,attendEvent,getWallEntries};

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


function getEventList(req,res,next){
    var udid=req.headers['udid']
var authorizationKeyOfUser= req.headers['authorization']
user.findOne({udid: udid, _id:authorizationKeyOfUser}, function(err,mongoUser){
    if(mongoUser){

        let listOfInterest =mongoUser.interesting.map(value => value.name)
        
        console.log(listOfInterest)
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
            kullanici.findOne({_id:authorizationKeyOfUser,udid:udid},function(err,user){
                if(err){
                    jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                        res.status(callback.code)
                        res.send(callback)
                    })
                }
                else{
                    var wallEntry= new WallEntrySchema({
                        postedBy:user,
                        text: req.body['text']
                        }
                    )
                    console.log(wallEntry)

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
           res.send(event.wallEntryList)
        }

    })

 


}









