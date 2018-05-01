
var EventSchema=require('../mocks/models/Event')
var UserSchema=require('../mocks/models/User')
var WallEntrySchema=require('../mocks/models/WallEntrySchema')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var Utils=require('../helpers/Utils')
var CommentSchema=require('../mocks/models/CommentSchema')



module.exports={postComment}
function postComment(req,res,next){
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
            Utils.searchInArray(wallEntryId,event.wallEntryList,function(callback){
                UserSchema.findOne({_id:authorizationKeyOfUser,udid:udid},function(err,user){
                    if(err){
                        jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        })
                    }else{
                        var commentObject=new CommentSchema({
                            postedBy:user,
                            text:req.body['text']
                        })
                        
                        event.wallEntryList[callback.index].comment.push(commentObject)
                        
                        
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
            })
        }
    })
}