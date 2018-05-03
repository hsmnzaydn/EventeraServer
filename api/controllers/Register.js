var kullanici=require('../mocks/models/User')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var etkinlik= require('../mocks/models/Event')
var category=require('../mocks/models/Category')


module.exports = {registerUser,getEventsCategories};


function getEventsCategories(req, res, next){
    res.json([{
           
        "id" : "1",
            "name" : "Business"
    
      },{
           
        "id" : "2",
            "name" : "Sport & Fitness"
    
      },{
           
        "id" : "3",
            "name" : "Hobbies"
    
      },{
           
        "id" : "4",
            "name" : "Travel & Outdoor"
    
      },{
           
        "id" : "5",
            "name" : "Film & Media"
    
      },{
           
        "id" : "6",
            "name" : "Home & Lifestyle"
    
      },{
           
        "id" : "7",
            "name" : "Science & Tech"
    
      },{
           
        "id" : "8",
            "name" : "Fashion"
    
      },{
           
        "id" : "9",
            "name" : "Health"
    
      },{
           
        "id" : "10",
            "name" : "Community"
    
      },{
           
        "id" : "11",
            "name" : "Family & Education"
    
      },{
           
        "id" : "12",
            "name" : "Spirituality"
    
      },{
           
        "id" : "13",
            "name" : "Arts"
    
      },{
           
        "id" : "14",
            "name" : "Others"
    
      }])
     /* category.find(function(err,results){
        if(err) {
            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                res.status(callback.code)
                res.send(callback)
            });
        }else{
            jsonCreator.commonResponseCreator(Constants.OK_CODE,Constants.OK_MESSAGE,function(callback){
                console.log(results);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(results));
            });
        }
      })*/
}


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