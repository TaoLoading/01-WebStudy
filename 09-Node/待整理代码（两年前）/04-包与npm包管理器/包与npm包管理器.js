/*
  1.什么是包？
      我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包。

  2.一个标准的包，应该包含哪些内容？
      1)	package.json ------- 描述文件（包的 “说明书”，必须要有！！！）
      2)	bin -----------------可执行二进制文件
      3)	lib ---------------- 经过编译后的js代码
      4)	doc	---------------- 文档（说明文档、bug修复文档、版本变更记录文档）
      5)	test --------------- 一些测试报告

  3.如何让一个普通文件夹变成一个包？
        让这个文件夹拥有一个：package.json文件即可,且package.json里面的内容要合法。
        执行命令：npm init
        包名的要求：不能有中文、不能有大写字母、不能与npm仓库上其他包同名，同时尽量不要以数字开头。

  4.npm与node的关系？（npm：node package manager）
        安装node后自动安装npm（npm是node官方出的包管理器，专门用于管理包）

  5.npm的常用命令？

      一、【搜索】：
            1.npm search xxxxx
            2.通过网址搜索：www.npmjs.com

      二、【安装】：(安装之前必须保证文件夹内有package.json，且里面的内容格式合法)

            1.npm install xxxxx --save   或   npm i xxxx -S   或   npm i xxxx（记住）
                备注：
                (1).局部安装完的第三方包，放在当前目录中node_modules这个文件夹里
                (2).安装完毕会自动产生一个package-lock.json(npm版本在5以后才有)，里面缓存的是每个下载过的包的地址，目的是下次安装时速度快一些
                    因为接收到下载请求的npm中的主服务器不存储下载地址，而是在继续在其他服务器中找下载地址
                (3).当安装完一个包，该包的名字会自动写入到package.json中的【dependencies(生产依赖)】里。npm5及之前版本要加上--save后缀才可以。

            2.npm install xxxxx --save-dev  或  npm i xxxxx -D  安装包并将该包写入到【devDependencies(开发依赖)】（记住）
              备注：什么是生产依赖与开发依赖？

                    1.只在开发时(写代码时)时才用到的库，就是开发依赖 ----- 例如：语法检查、压缩代码、扩展css前缀的包。
                    2.在生产环境中(项目上线)不可缺少的，就是生产依赖 ------ 例如：jquery、bootStrap等等。
                    3.注意：某些包即属于开发依赖，又属于生产依赖 -------例如：jquery。

            3.npm i xxxx -g  全局安装xxxx包（一般来说，带有指令集的包要进行全局安装，例如：browserify、babel等）（记住）
              全局安装的包，其指令到处可用。如果该包不带有指令，就无需全局安装，即使全局安装了在其他项目也无法使用
              查看全局安装的位置：npm root -g
M
            4.npm i xxx@yyy :安装xxx包的yyy版本（记住）

            5.npm i ：安装package.json中声明的所有包（记住）

      三、【移除】：
            npm remove xxxxx  在node_module中删除xxxx包，同时会删除该包在package.json中的声明（记住）

      四、【其他命令】：
            1.npm aduit fix :检测项目依赖中的一些问题，并且尝试着修复。

            2.npm view xxxxx versions :查看远程npm仓库中xxxx包的所有版本信息（记住）

            3.npm view xxxxx version :查看npm仓库中xxxx包的最新版本

            4.npm ls xxxx :查看我们所安装的xxxx包的版本(有package.json中的版本可能不准)（记住）

       五、【关于版本号的说明】：
            "^3.x.x" ：锁定大版本，以后安装包的时候，保证包是3.x.x版本，x默认取最新的。
            "~3.1.x" ：锁定小版本，以后安装包的时候，保证包是3.1.x版本，x默认取最新的。
            "3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本。
* */
