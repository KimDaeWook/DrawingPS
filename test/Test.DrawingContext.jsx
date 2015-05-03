var sprintf = require("sprintf");
var DrawingContext = require("DrawingContext");
var Color = require("Color")
var dc = new DrawingContext();

dc.drawRectangle(200,100, 100,100, { fill : new Color(0,0,255)});

dc.drawLine(100,100, 200, 200);
dc.drawLine(200,100, 100, 200);
dc.drawEllipse(200,200, 100, 100, {opacity : 40});

dc.flush();