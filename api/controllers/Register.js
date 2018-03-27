var kullanici=require('../mocks/models/User')
var jsonCreator= require('../helpers/JsonCreator')
var Constants=require('../helpers/Constants')
var etkinlik= require('../mocks/models/Event')
var category=require('../mocks/models/Category')


module.exports = {registerUser,getEventsCategories};
//module.exports = {getEventsCategories};



function getEventsCategories(req, res, next){
    res.json([{
           
        "categoryId" : "1",
            "cName" : "Business"
    
      },{
           
        "categoryId" : "2",
            "cName" : "Sport & Fitness"
    
      },{
           
        "categoryId" : "3",
            "cName" : "Hobbies"
    
      },{
           
        "categoryId" : "4",
            "cName" : "Travel & Outdoor"
    
      },{
           
        "categoryId" : "5",
            "cName" : "Film & Media"
    
      },{
           
        "categoryId" : "6",
            "cName" : "Home & Lifestyle"
    
      },{
           
        "categoryId" : "7",
            "cName" : "Science & Tech"
    
      },{
           
        "categoryId" : "8",
            "cName" : "Fashion"
    
      },{
           
        "categoryId" : "9",
            "cName" : "Health"
    
      },{
           
        "categoryId" : "10",
            "cName" : "Community"
    
      },{
           
        "categoryId" : "11",
            "cName" : "Family & Education"
    
      },{
           
        "categoryId" : "12",
            "cName" : "Spirituality"
    
      },{
           
        "categoryId" : "13",
            "cName" : "Arts"
    
      },{
           
        "categoryId" : "14",
            "cName" : "Others"
    
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