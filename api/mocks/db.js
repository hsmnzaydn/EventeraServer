var mongo= require("mongoose");
mongo.Promise=require('bluebird');

var mongoDB= 'mongodb://localhost/NodeProje';

mongo.connect(mongoDB,function (err1,err2) {
    if(err1){
        console.log("mongoose hatası: "+err.log)
    }else {
        console.log("mongose bağlandı",mongoDB)
    }
})