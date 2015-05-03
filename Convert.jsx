require(function(){

    Number.prototype.toHex = function(useUpperCase) {
        var hex = parseInt(this).toString(16);        
        hex = hex.length == 1 ? "0" + hex : hex;
        return useUpperCase ? hex.toUpperCase() : hex;
    }
    $.global.typeID = function(value) {
        if(value == null) return 0;
        if (value.length == 4) return charIDToTypeID(value);
        else return stringIDToTypeID(value);
    }

    ActionDescriptor.prototype.dump = function() {
        var descriptor = this;
        var count = descriptor.count;
        $.writeln("==========================");
        for (var i = 0; i < count; i++) {
            var key = descriptor.getKey(i);
            $.writeln(typeIDToCharID(key) + "\t" + typeIDToStringID(key));
        }
        $.writeln("==========================");
    }

    var Convert = function(){
    };

    
    
    

    return Convert;
    
});
