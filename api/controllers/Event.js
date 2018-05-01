var user=require('../mocks/models/User')
var etkinlik= require('../mocks/models/Event')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')

module.exports = {getSpecificEventList};




function getSpecificEventList(req,res,next){
    var udid= req.headers['udid']
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
          
        /*
              etkinlik.find({eventCategoryName: $or  [ interestingList]},function(err,eventList){
                    //   etkinlik.find({eventCategoryName:mongoUser[0].interesting[i].name},function(err,eventList){
            
                    if(err) {
                        jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                            res.status(callback.code)
                            res.send(callback)
                        });
                    }
                    if(eventList.length != 0){
                       res.json(eventList)
                        console.log(eventList)
                    }
                    
                })*/
           

        });
    }

