"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({ name: { type: 'String' } });
var Test = mongoose_1.model('Test', schema);
var doc = new Test({ name: 'foo' });
doc.name = 'bar';
