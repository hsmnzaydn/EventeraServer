
var EventSchema=require('../mocks/models/Event')
var UserSchema=require('../mocks/models/User')
var WallEntrySchema=require('../mocks/models/WallEntrySchema')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var Utils=require('../helpers/Utils')
var CommentSchema=require('../mocks/models/CommentSchema')

let commentCount=0;

module.exports={postComment,getComment}


function postComment(req,res,next){
    var udid=req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var eventId = req.swagger.params.eventId.value
    var wallEntryId = req.swagger.params.wallEntryId.value

    EventSchema.findOne({_id:eventId},function(err,event){
        if(err){
            console.log(err)
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{
             Utils.searchInArray(wallEntryId,event.wallEntryList,function(callback){
                UserSchema.findOne({_id:authorizationKeyOfUser,udid:udid},function(err,user){
                    if(err){
                        console.log(err)
                        jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        })
                    }else{
                        let test=new WallEntrySchema();
                        test=event.wallEntryList[callback.index]
                        test.comment.push({
                            postedBy:user,
                            text:req.body['text']
                        })
                       
                         event.wallEntryList.splice(callback.index,1)
                         event.wallEntryList.push(test)
                        
                       
                      
                       event.save(function(err,eventTwo){
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
                       });
                       
                    }
                    
                })             
            })    
              

 } 

    })
}


function getComment(req,res,next){
    var udid=req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var eventId = req.swagger.params.eventId.value
    var wallEntryId = req.swagger.params.wallEntryId.value


    EventSchema.findOne({_id:eventId},function(err,event){
        if(err){
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{

            if(event){
                event.wallEntryList.filter(function(wallEntry){
                    if(wallEntry._id.toString() == wallEntryId){
                        res.status(Constants.OK_CODE)
                        res.send(wallEntry.comment.reverse())
                    }else{
                        console.log("Başarısız")
                    }
                }) 

            }
        }
    })


}