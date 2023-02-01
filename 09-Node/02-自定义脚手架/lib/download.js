/**
 * 下载代码
 */

const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')

const downloadFun = function (url, projectName) {
  const spinner = ora().start()
  spinner.text = '正在下载示例代码……'
  // download('direct:' + url, projectName, { clone: true }, (err) => {
  download('flippidippi/download-git-repo-fixture', projectName, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed('下载成功')
      console.log(chalk.blue.bold('Done!'), chalk.bold('现在开始启动它吧:'))
      console.log('cd ' + projectName)
      console.log('yarn')
      console.log('yarn dev')
    } else {
      spinner.fail('代码下载失败')
      console.log('失败原因：', err)
    }
  })
}

module.exports = downloadFun

