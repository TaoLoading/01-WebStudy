## 自定义脚手架

### 功能
* 全局命令执行
* 命令行交互
* 创建项目初始化代码文件及目录

### 实现步骤
1. 创建自定义全局命令
   1. 初始化项目
   2. 创建入口文件bin/cli.js
   3. 项目根目录下挂载命令到全局命令行中`npm link`
2. 实现帮助提示
    ```javascript
    const helpContent = (program) => {
      program.option('-f <framework>', '设置框架')
    }

    module.exports = helpContent
    ```
3. 自定义命令
    ```javascript
    const customCommander = (program) => {
    program
      .command('create projectName') // 自定义命令名称
      .alias('crt') // 命令别名
      .description('初始化项目') // 加入到help中
      .action((projectName) => { // 执行的内容
        actionContent(projectName)
      })
    }
    ```
4. 自定义命令执行内容
    ```javascript
    const actionContent = (projectName) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: '请选择你所使用的框架',
          choices: config.frameworkArr
        }
      ]).then(answer => {
        console.log('answer', answer)
      })
    }
    ```
5. 下载远程项目代码
    ```javascript
    download('flippidippi/download-git-repo-fixture', projectName, { clone: true }, (err) => {
     if (!err) {
       spinner.succeed('代码下载成功')
       console.log(chalk.blue.bold('Done!'), chalk.bold('现在开始启动它吧:'))
       console.log('cd ' + projectName)
       console.log('yarn')
       console.log('yarn dev')
     } else {
       spinner.fail('代码下载失败')
       console.log('失败原因：', err)
     }
    })
    ```
6. 构建成功提示（使用`ora`和`chalk`实现）

### 使用方法
在终端中输入`myCLI crt projectName`，回车后按提示操作即可