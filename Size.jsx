require(function(){

    require("Convert");

    function loadFromDescriptor(descriptor) {
        this.width = descriptor.getUnitDoubleValue(typeID("Wdth"));
        this.height = descriptor.getUnitDoubleValue(typeID("Hght"));        
    }

    function Size(width, height) {        
        if(arguments.length == 1) {
            if(arguments[0].constructor.name == "ActionDescriptor") {
                loadFromDescriptor.apply(this, arguments);
            }       
        } else {
            this.width = height;
            this.height = height;
        }        
    }   
    
    Size.prototype.width = 0;
    Size.prototype.height = 0;
    
    
    Size.prototype.isEmpty = function() {
        return this == Size.empty;
    };    
    Size.prototype.toString = function() {        
        if(this.isEmpty()) return "EMPTY";
        return this.width + "," + this.height;
    }

    Size.prototype.toFormat = function(format) {
            var sprintf = require("sprintf");
            return sprintf(format, this.width, this.height);
    }

    Size.prototype.toDescriptor = function(SizeType) {

        if(SizeType == null) SizeType = typeID("#Pxl");
        var result = new ActionDescriptor();
        result.putUnitDouble(typeID("Wdth"), SizeType, this.width);
        result.putUnitDouble(typeID("Hght"), SizeType, this.height);
        return result;
        
    }

    Size.empty = new Size(Number.MIN_VALUE,Number.MIN_VALUE);

    
    return Size;
    
});