var sprintf = require("sprintf");
var Size = require("Size");

var size = new Size(50, 50);
var descriptor = size.toDescriptor();
var size2 = new Size(descriptor);

$.writeln(size2);
