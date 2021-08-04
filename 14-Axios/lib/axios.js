'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  /* 
  创建Axios的实例
      原型对象上有一些用来发请求的方法: get()/post()/put()/delete()/request()
      自身上有2个重要属性: defaults/interceptors
  */  
  var context = new Axios(defaultConfig);

  // axios和axios.create()对应的就是request函数
  // Axios.prototype.request.bind(context)
  var instance = bind(Axios.prototype.request, context); // axios

  // 将Axios原型对象上的方法拷贝到instance上: request()/get()/post()/put()/delete()
  utils.extend(instance, Axios.prototype, context); 

  // 将Axios实例对象上的属性拷贝到instance上: defaults和interceptors属性
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
