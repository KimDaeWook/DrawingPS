require(function(){

    require("Convert");

    function loadFromDescriptor(descriptor) {
        this.r = descriptor.getDouble(typeID("Rd  "));
        this.g = descriptor.getDouble(typeID("Grn "));
        this.b = descriptor.getDouble(typeID("Bl  "));        
    }

    function Color(r, g, b) {        
        if(arguments.length == 1 && arguments[0].constructor.name == "ActionDescriptor") {
            loadFromDescriptor.apply(this, arguments);
        } else {
            this.r = r;
            this.g = g;
            this.b = b;            
        }        
    }   
    
    Color.prototype.b = 0;
    Color.prototype.g = 0;
    Color.prototype.r = 0;
    
    Color.prototype.toRGB = function() {
            var sprintf = require("sprintf");
            return sprintf("(%d, %d, %d)", this.r, this.g , this.b);
    }

    Color.prototype.toHex = function(upperCase) {
        
        return "#" + this.r.toHex(upperCase) + this.g.toHex(upperCase) + this.b.toHex(upperCase);        
    }

    Color.prototype.toFormat = function(format) {
            var sprintf = require("sprintf");
            return sprintf(format, this.r, this.g , this.b);
    }

    Color.prototype.toDescriptor = function() {
        require("Convert");
        var result = new ActionDescriptor();
        result.putDouble(typeID("Rd  "), this.r);
        result.putDouble(typeID("Grn "), this.g);
        result.putDouble(typeID("Bl  "), this.b);
        return result;           
    }

    return Color;
    
});