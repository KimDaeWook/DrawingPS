require(function(){
    
    var Color = require("Color");
    var Size =  require("Size");
    var Point =  require("Point");
    var Rectangle =  require("Rectangle");
    var Utils = require("Utils");
    
    function onRenderShape(shape, drawingContext) {
        
        var type = shape.type;
        var descriptor = shape.descriptor;
        var options = shape.options;
        
        var desc448 = new ActionDescriptor();
        var ref321 = new ActionReference();
        ref321.putClass( stringIDToTypeID( "contentLayer" ));
        desc448.putReference( charIDToTypeID( "null" ), ref321 );

        var layerDescriptor = new ActionDescriptor();

        var solidColorLayerDescriptor = new ActionDescriptor();
        solidColorLayerDescriptor.putObject(typeID("Clr "), typeID("RGBC"), options.fill.toDescriptor());        
        
        if(options.opacity != 100) {
            layerDescriptor.putUnitDouble(typeID("Opct"), typeID("#Prc"), options.opacity);    
        }
    
        layerDescriptor.putObject(typeID("Type"),stringIDToTypeID( "solidColorLayer" ), solidColorLayerDescriptor);
        layerDescriptor.putObject( charIDToTypeID( "Shp " ), type, descriptor);
            
        desc448.putObject( charIDToTypeID( "Usng" ), stringIDToTypeID( "contentLayer" ), layerDescriptor );
        executeAction( charIDToTypeID( "Mk  " ), desc448, DialogModes.NO );
    }
    

    function onRenderDrawingContext() {
        
        
        for(var i =0; i < this.drawingQueue.length; i++) {

            var drawingItem = this.drawingQueue[i];
            if(drawingItem.renderer) {
                drawingItem.renderer.call(this, drawingItem, {
                    index : i
                });
            }
        
        }
    
        this.drawingQueue = [];

    }

    function DrawingItem(renderer, options) {
        this.renderer = renderer;
        this.options = Utils.extend(this.options, options);
    }


    DrawingItem.prototype.renderer = null;
    DrawingItem.prototype.options = {
        fill : new Color(255, 0, 0),
        opacity : 100
    };

    function ShapeDrawingItem(type ,descriptor, options, renderer) {        
        DrawingItem.call(this, onRenderShape, options);
        this.type = type;
        this.descriptor = descriptor;
    }
    ShapeDrawingItem.prototype = DrawingItem.prototype;
    ShapeDrawingItem.prototype.type = null;
    ShapeDrawingItem.prototype.descriptor = null;
    
    function DrawingContext(options) {             
        
    }

    DrawingContext.prototype.drawingQueue = [];
    DrawingContext.prototype.options = {
        useHistoryGroup : true,
        historyTitle : "Render Drawing Context",
        autoFlush : false,
        mergePath : false
    }

    DrawingContext.prototype.isDirty = function() {
        return this.drawingQueue.length > 0;
    }
    
    DrawingContext.prototype.drawLine = function(x1, y1, x2, y2, options) {
        
        var descriptor = new ActionDescriptor();
        descriptor.putObject( typeID( "Strt" ), typeID( "Pnt " ), new Point(x1, y1).toDescriptor());       
        descriptor.putObject( typeID( "End " ), typeID( "Pnt " ), new Point(x2, y2).toDescriptor());   
        descriptor.putUnitDouble( typeID( "Wdth" ), typeID( "#Pxl" ), 1.000000 );

        this.drawingQueue.push(new ShapeDrawingItem(typeID( "Ln  "), descriptor, options));
        
        if(this.options.autoFlush) this.flush();      
        
    }

    DrawingContext.prototype.drawRectangle = function(x, y, width, height, options) {
        
        var descriptor = new Rectangle(x, y, width, height).toDescriptor();
        if(false && options.radius) {
            descriptor.putUnitDouble( typeID( "Rds " ), typeID( "#Pxl" ), options.radius);        
        }        
        this.drawingQueue.push(new ShapeDrawingItem(typeID( "Rctn"), descriptor, options));
        
        if(this.options.autoFlush) this.flush();      
        
    }

    DrawingContext.prototype.drawEllipse = function(x, y, width, height, options) {
        
        var descriptor = new Rectangle(x, y, width, height).toDescriptor();
        this.drawingQueue.push(new ShapeDrawingItem(typeID( "Elps"), descriptor, options));
        
        if(this.options.autoFlush) this.flush();      
        
    }

    DrawingContext.prototype.flush = function() {
        
        if(this.isDirty() == false) return;
        if(this.options.useHistoryGroup) {
            activeDocument.suspendHistory (this.options.historyTitle, "onRenderDrawingContext.apply(this)");
        } else {
            onRenderDrawingContext.apply(this);
        }        
        
    }
    DrawingContext.DrawingItem = DrawingItem;
    DrawingContext.ShapeDrawingItem = ShapeDrawingItem;

    return DrawingContext;
    
    
});