#! /usr/bin/env node

/**
 * 命令行入口文件
 */

const { program } = require('commander')
const helpContent = require('../lib/help')
const customCommander = require('../lib/customCommander')

helpContent(program)
customCommander(program)

// 拿到参数
program.parse(process.argv)
