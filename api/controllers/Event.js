var kullanici=require('../mocks/models/User')
var etkinlik= require('../mocks/models/Event')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')

module.exports = {getAllEvent};

function getAllEvent(req, res, next) {
    console.log( etkinlik.find({},function(err,events){
        if(err) {
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            });
        }
        else{
            res.status(Constants.OK_CODE)
            res.json(events)        
        }
        })
    )
}


