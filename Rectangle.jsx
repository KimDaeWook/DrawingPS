require(function(){

    require("Convert");

    function loadFromDescriptor(descriptor) {
                
        this.x = descriptor.getUnitDoubleValue(typeID("Left"));
        this.y = descriptor.getUnitDoubleValue(typeID("Top "));
        var right = descriptor.getUnitDoubleValue(typeID("Rght"));
        var bottom = descriptor.getUnitDoubleValue(typeID("Btom"));
        
        this.width = right - this.x;
        this.height = bottom - this.y;        
    }

    function Rectangle(x, y, w, h ) {        
        if(arguments.length == 1) {
            if(arguments[0].constructor.name == "ActionDescriptor") {
                loadFromDescriptor.apply(this, arguments);
            }       
        } else {
            this.x = x;
            this.y = y;
            this.width = w;            
            this.height = h;            
        }        
    }   
    
    Rectangle.prototype.x = 0;
    Rectangle.prototype.y = 0;
    Rectangle.prototype.width = 0;
    Rectangle.prototype.height = 0;

    Rectangle.prototype.right = function () {
        return this.x + this.width;
    };
    Rectangle.prototype.bottom = function() {
        return this.y + this.height;
    };
    Rectangle.prototype.isEmpty = function() {
        return this == Rectangle.empty;
    };    

    Rectangle.prototype.intersectsWith = function(rect) {
        return ((((rect.x < (this.x + this.width)) && (this.x < (rect.x+ rect.width))) && (rect.y < (this.y + this.height))) && (this.y < (rect.y + rect.height)));
    };
    Rectangle.prototype.contains = function(rect) {
        return ((((this.x <= rect.x) && ((rect.x + rect.width) <= (this.x + this.width))) && (this.y <= rect.y)) && ((rect.y + rect.height) <= (this.y + this.height)));
    };


    Rectangle.prototype.toString = function() {        
        if(this.isEmpty()) return "EMPTY";
        return this.x + "," + this.y + "," + this.width + "," + this.height;
    }

    Rectangle.prototype.toFormat = function(format) {
            var sprintf = require("sprintf");
            return sprintf(format, this.x, this.y , this.width, this.height);
    }

    Rectangle.prototype.toDescriptor = function() {

        var result = new ActionDescriptor();
        result.putUnitDouble(typeID("Left"), typeID("#Pxl"), this.x);
        result.putUnitDouble(typeID("Top "), typeID("#Pxl"), this.y);
        result.putUnitDouble(typeID("Rght"), typeID("#Pxl"), this.right());
        result.putUnitDouble(typeID("Btom"), typeID("#Pxl"), this.bottom());
        return result;
        
    }

    Rectangle.empty = new Rectangle(Number.MIN_VALUE,Number.MIN_VALUE,0,0);

    Rectangle.intersect = function(a, b) {
        var x = Math.max(a.x, b.x);
        var right = Math.min((a.x + a.width), (b.x + b.width));
        var y = Math.max(a.y, b.y);
        var bottom = Math.min((a.y + a.height), (b.y + b.height));
        if ((right >= x) && (bottom >= y)) {
            return new Rectangle(x, y, right - x, bottom - y);
        }
        return Rectangle.empty;
    };

    Rectangle.union = function(a, b) {
        var x = Math.min(a.x, b.x);
        var right = Math.max((a.x + a.width), (b.x + b.width));
        var y = Math.min(a.y, b.y);
        var bottom = Math.max((a.y + a.height), (b.y + b.height));
        return new Rectangle(x, y, right - x, bottom - y);        
    }
    
    return Rectangle;
    
});