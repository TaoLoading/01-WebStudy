## cnpm的简介与使用

###1.国内使用npm存在的问题

* 安装npm后，每次我们安装包时，我们的电脑都要和npm服务器进行对话，去npm仓库获取包。
* npm默认的仓库地址为：http://registry.npmjs.org 
* 查看当前npm仓库地址命令：``` npm config get registry ```，提示如下图：
![Alt text](https://s2.ax1x.com/2019/01/08/FqtKhR.png)

* 因为npm的远程服务器在国外，所以有时候难免出现访问过慢，甚至无法访问的情况。
* 为了解决这个问题，我们有以下几个解决办法

###2.使用淘宝的cnpm代替npm

> 淘宝为我们搭建了一个国内的npm服务器，它目前是每隔10分钟将国外npm仓库的所有内容“搬运”回国内的服务器上，这样我们直接访问淘宝的国内服务器就可以了，它的地址是：https://registry.npm.taobao.org

###3.存在的问题
* 命令和下载文件结构不友好，例如命令删除一个包所有包都被删除

### 使用方法：

####第一种：直接安装cnpm
安装淘宝提供的cnpm，并更改服务器地址为淘宝的国内地址，
命令：``` npm install -g cnpm --registry=https://registry.npm.taobao.org ```，以后安装直接采用```cnpm```替代```npm```，
例如原生npm命令为：```npm install uniq --save```，cnpm命令为：```cnpm install uniq --save```

####第二种：替换npm仓库地址为淘宝镜像地址（推荐）
命令：```npm config set registry https://registry.npm.taobao.org```，
查看是否更改成功：```npm config get registry ```，以后安装时，依然用npm命令，但是实际是从淘宝国内服务器下载的





