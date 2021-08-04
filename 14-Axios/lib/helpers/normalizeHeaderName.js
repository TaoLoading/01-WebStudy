'use strict';

var utils = require('../utils');

/* 
如果headers中有对应的不规范的属性, 将属性名改为指定的规范名称, 值还用原本的值
如: 原本有Content-type属性, 改为Content-Type属性, 
*/
module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
