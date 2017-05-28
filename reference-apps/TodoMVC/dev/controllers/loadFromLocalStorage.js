import {todosData} from '../data/todosData'
import {todoComponent} from '../components/todoComponent'
import {renderActiveTodos} from '../controllers/renderActiveTodos'

export function loadFromLocalStorage() {

  // Get data from localStorage
  //===========================
  let todos = localStorage.getItem('chui-todo')
  todos = JSON.parse(todos)
  if (todos && todos.length) {
    todos.forEach(todo => todosData.push(todo))
  }
  todoComponent.render(todosData)
  renderActiveTodos(todos)
}
