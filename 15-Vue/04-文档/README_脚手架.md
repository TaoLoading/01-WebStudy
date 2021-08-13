## 1. vue的脚手架
	脚手架V2: 相对老的项目
	脚手架v3: 新的项目
	脚手架v4: 最新的(当前用得还少)

## 使用vue的脚手架
	npm install -g @vue/cli    3的脚手架
	vue create vue-app3  
	
	npm install -g @vue/cli-init  2的脚手架
	vue init webpack vue-app2   
	
	npm install -g vue-cli  2的脚手架(老的)
	vue init webpack vue-app2

## 比较V2与V3创建的项目
	1. v2的配置是直接可见, v3是包装隐藏起来了
	2. 修改配置: v2是直接在配置文件中修改, v3提供了一个专门的配置: vue.config.js, 我们可以根据文档在此文件中添加配置
	3. vue使用的是不带编译器的版本, 打包文件更小  不写template配置, 直接render配置