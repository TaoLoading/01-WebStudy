/**
 * 自定义命令
 */

const actionContent = require('./action')

const customCommander = (program) => {
  program
    .command('create projectName') // 自定义命令名称
    .alias('crt') // 命令别名
    .description('初始化项目') // 加入到help中
    .action((projectName) => { // 执行的内容
      actionContent(projectName)
    })
}

module.exports = customCommander
