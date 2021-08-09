// 模拟js分线程
onmessage = function (msg) {
  console.log('主线程发送过来的数据： ', msg.data);
  var result = msg.data.toLowerCase();
  // 将结果发送主线程
  postMessage(result);
}