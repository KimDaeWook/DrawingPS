require(function(){

    var Utils = function() {};
    
    Utils.extend = function(x,y){
        var result = {};
        if(x) {
            for (var attrname in x) { result[attrname] = x[attrname]; }            
        }
    
        if(y) {
            for (var attrname in y) {result[attrname] = y[attrname]; }            
        }

        return result;
    };

    
    return Utils;
    
});