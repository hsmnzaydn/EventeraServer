var UserSchema=require('../mocks/models/User')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var Utils=require('../helpers/Utils')


module.exports={getProfile,updateProfile}

function getProfile(req,res,next){

    var udid= req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var profileId=req.swagger.params.profileId.value

    UserSchema.findOne({udid:udid},function(err,user){

        if(err){
            console.log(err)
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{
            if(user){
                UserSchema.findOne({udid:profileId},function(err,userTwo){
                    if(err){
                        console.log(err)
                        jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        })
                    }else{
                        if(userTwo){
                                jsonCreator.commonResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,function(callback){
                                    res.status(callback.code)
                                    userTwo._id=null
                                    res.send(userTwo)
                                })
                            
                        }
                    }
                })
            }
        }

    })

}


function updateProfile(req,res,next){
    var udid= req.headers['udid']
    var authorizationKeyOfUser= req.headers['authorization']
    var profileId=req.swagger.params.profileId.value
    var interesting=req.body['interests']


    UserSchema.findOne({udid:udid},function(err,user){
        if(err){
            console.log(err)
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            })
        }else{
            if(user){
                user.interesting=interesting
                user.save(function(err){
                    if(err){
                        console.log(err)
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
        }



    })



}