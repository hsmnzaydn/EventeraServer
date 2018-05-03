

module.exports.searchInArray= function(valueKey,arrayList,callback){
    var object=new Object();
    for(var index=0;index<arrayList.length;index++){

        if(arrayList[index]._id == valueKey){
            object.list=arrayList[index]
            object.index=index
             callback(object)
        }
    }
}


module.exports.setNullObjectInArray= function(arrayList,callback){

    arrayList.forEach(element => {
        element.wallEntryList=null
    },function(){
        callback.List=arrayList;
    });


}