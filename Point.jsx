require(function(){

    require("Convert");

    function loadFromDescriptor(descriptor) {
        this.x = descriptor.getUnitDoubleValue(typeID("Hrzn"));
        this.y = descriptor.getUnitDoubleValue(typeID("Vrtc"));        
    }

    function Point(x, y) {        
        if(arguments.length == 1) {
            if(arguments[0].constructor.name == "ActionDescriptor") {
                loadFromDescriptor.apply(this, arguments);
            }       
        } else {
            this.x = x;
            this.y = y;
        }        
    }   
    
    Point.prototype.x = 0;
    Point.prototype.y = 0;
    
    Point.prototype.isEmpty = function() {
        return this == Point.empty;
    };    
    Point.prototype.toString = function() {        
        if(this.isEmpty()) return "EMPTY";
        return this.x + "," + this.y;
    }

    Point.prototype.toFormat = function(format) {
            var sprintf = require("sprintf");
            return sprintf(format, this.x, this.y);
    }

    Point.prototype.toDescriptor = function(pointType) {

        if(pointType == null) pointType = typeID("#Pxl");
        var result = new ActionDescriptor();
        result.putUnitDouble(typeID("Hrzn"), pointType, this.x);
        result.putUnitDouble(typeID("Vrtc"), pointType, this.y);
        return result;
        
    }

    Point.empty = new Point(Number.MIN_VALUE,Number.MIN_VALUE);

    
    return Point;
    
});