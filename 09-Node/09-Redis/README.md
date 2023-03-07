## Redis

### Windows下安装

1. 借助工具：https://github.com/tporadowski/redis/releases
2. 修改环境变量：解压后的文件地址添加到path中
3. 检查是否安装成功：cmd窗口内执行` redis-cli -v `

### 运行

1. 启动redis服务：cmd窗口内执行` redis-server `
2. 连接redis：另起一个cmd窗口，执行` redis-cli `

### 常用命令

1. key 相关
   * 查找所有符合模式pattern的key：` KEYS pattern `
   * 判断key是否存在于数据库中：` EXISTS key [key...] `
   * 移动指定的key到指定的数据库实例：` MOVE key index `
   * 重命名指定key：` RENAME key newKey `
   * 删除指定key和value：` DEL key [key...] `
   * 查看指定key的数据类型：` TYPE key `
2. 字符串 string 相关
   * 添加数据：` SET key value `
   * 获取指定key的值：` GET key `
   * 获取指定key的值：` GET key `
3. 列表 list 相关
   * 将一个或多个值依次插入列表的表头：` LPUSH key value [value...] `
   * 获取列表中指定下标区间的元素：` LRANGE key startIndex endIndex `
   * 将一个或多个值依次插入列表的表尾：` RPUSH key value [value...] `
   * 删除指定列表的表头元素并返回：` LPOP key `
   * 删除指定列表的表尾元素并返回：` RPOP key `
   * 获取指定列表中指定下标的元素并返回：` LINDEX key index `
   * 获取指定列表的长度：` LLEN key `
4. 集合 set 相关
   * 将一个或多个元素添加到指定的集合中：` SADD key member [member...] `
   * 获取指定集合中的所有元素：` SMEMBERS key `
   * 判断指定元素在指定集合中是否存在：` SISMEMBER key member `
   * 获取指定集合的长度：` SCARD key `
   * 移除指定集合中一个或者多个元素：` SREM key member [member...] `
   * 从指定集合中随机移除一个或者多个元素：` SPOP key [count] `，count默认为1
5. 双列集合 hash 相关
   * 将一个或多个键值对存储到指定集合中：` HSET key filed [member...] `
   * 获取hash表中指定的filed值：` HGET key filed `
   * 获取指定hash表中的所有filed和value：` HGETALL key `
   * 删除指定hash表中的一个或者多个filed：` HDEL key filed [filed...] `
6. 有序单列双列集合 zSet 相关
   * 将一个或者多个member及score加入有序集合：` ZADD key score member [score member...] `
   * 获取指定集合指定区间的元素：` ZRANGE key startIndex endIndex `
   * 根据指定分数区间获取元素：` ZRANGEBYSCORE key min max `
   * 删除指定集合中一个或多个指定元素：` ZREM key member [member...] `
   * 获取集合中元素的个数：` ZCARD key `
   * 从小到大获取指定元素的排名（从0开始）：` ZRANK key member `
   * 从大到小获取指定元素的排名（从0开始）：` ZREVRANK key member `
   * 获取指定集合中的指定元素的分数：` ZSCORE key member `