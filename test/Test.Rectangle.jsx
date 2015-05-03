var sprintf = require("sprintf");
var Rectangle = require("Rectangle");

var rectangle = new Rectangle(50, 50, 100,100);
var descriptor = rectangle.toDescriptor();
var rectangle2 = new Rectangle(descriptor);
rectangle2.x += 500;
rectangle2.y += 500;
var unionRectangle = Rectangle.union(rectangle, rectangle2);

$.writeln(sprintf("union (%s) + (%s) = > (%s)" , rectangle, rectangle2, unionRectangle));

var isIntersect = rectangle.intersectsWith(rectangle2);
$.writeln(sprintf("is Intersect (%s) + (%s) = > %s", rectangle, rectangle2, isIntersect));
var intersectRectangle = Rectangle.intersect(rectangle, rectangle2);
$.writeln(sprintf("Intersect (%s) + (%s) = > %s", rectangle, rectangle2, intersectRectangle));
