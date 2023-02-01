/**
 * 自定义命令的执行内容
 */

const inquirer = require('inquirer')
const config = require('../config')
const downloadFun = require('./download')

const actionContent = async (projectName) => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: '请选择你所使用的框架',
      choices: config.frameworkArr
    }
  ])
  // console.log('下载地址', config.frameworkUrl[answer.framework])
  downloadFun(config.frameworkUrl[answer.framework], projectName)
}

module.exports = actionContent
