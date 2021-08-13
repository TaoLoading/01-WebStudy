// localStorage数据存取的工具模块：包含数据存储和数据读取两个工具函数
// 采取分别保留的形式向外暴露工具函数

export function saveTodos(todos) {
	localStorage.setItem('todos_key', JSON.stringify(todos))
}

export function getTodos() {
	return JSON.parse(localStorage.getItem('todos_key') || '[]')
}
