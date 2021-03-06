
var event=require('../mocks/models/Event')
var jsonCreator=require('../helpers/JsonCreator')
var fs = require('fs');
var CsvReadableStream = require('csv-reader');

    var inputStream = fs.createReadStream('/opt/EventeraPython/datasets.csv', 'utf8');

    inputStream
        .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            
           var etkinlik= new event({
               eventName: row[0],
               eventDescription: row[1],
               evemtStartTime: row[2],
               eventEndTime: row[3],
               eventCategoryName: row[4],
               eventLocation: row[5]
    
            })

            event.findOne({eventName:etkinlik.eventName.toString()},function(err,event){
                if(!event){
                    etkinlik.save(function(err) {
                        if (err) {
                            jsonCreator.commonResponseCreator(Constants.ERROR_CODE,Constants.ERROR_MESSAGE,function(callback){
                                res.status(callback.code)
                                res.send(callback)
                            });
                        }
                        
                    });
                }
            })
            
          
            
        })
        .on('end', function (data) {
            console.log("It has been finished the save to database")
        });


