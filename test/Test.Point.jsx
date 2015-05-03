var sprintf = require("sprintf");
var Point = require("Point");

var point = new Point(50.0, 50.0);
var descriptor = point.toDescriptor();
var point2 = new Point(descriptor);

$.writeln(point2);
