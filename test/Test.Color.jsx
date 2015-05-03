var Color = require("Color");



var color = new Color(255,0,0);
var result = color.toDescriptor();
var color = new Color(result);

$.writeln(color.toHex(true));
$.writeln(color.toRGB());
$.writeln(color.toFormat("RGB(%d, %d, %d)"));