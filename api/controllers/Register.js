var kullanici=require('../mocks/models/User')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')

module.exports = {registerUser};


function registerUser(req, res, next) {
    var udid= req.headers['udid']
    var user= new kullanici({
        name: req.body['name'],
        udid: req.headers['udid'],
        job: req.body['job'],
        location: req.body['adress'],
        age: req.body['age'],
        sex: req.body['sex'],
        mail: req.body['mail'],
        interesting: req.body['interests'],
        attendes: []
    })

    user.save(function(err,user) {
        if (err) throw err;
        jsonCreator.registerResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,user._id,function(callback){
            res.status(callback.code)
            res.send(callback)
        })
    });

    

}