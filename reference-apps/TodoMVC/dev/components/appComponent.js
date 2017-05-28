import {todosData} from '../data/todosData'
import {todoComponent} from '../components/todoComponent'
import {renderActiveTodos} from '../controllers/renderActiveTodos'
import {toggleButtonState} from '../controllers/toggleButtonState'
export const appComponent = new Component({
  element: '#main',
  actions: [
    {
      event: 'keypress',
      element: '#add-todo',
      callback: (e) => {
        if (e.keyCode == 13) {
          const todo = $('#add-todo').val()
          $('#add-todo')[0].value = ''
          if (todo) {
            todosData.unshift({state: 'active', value: todo, id: $.uuid()})
            renderActiveTodos(todosData)
            todoComponent.render(todosData)
            toggleButtonState('#show-all')
          }
          localStorage.setItem('chui-todo', JSON.stringify(todosData))
        }
      }
    },
    /**
     * Add todo item:
     */
    {
      event: 'tap',
      element: '.add',
      callback: () => {
        console.log('adding todo')
        const todo = $('#add-todo').val()
        $('#add-todo')[0].value = ''
        if (todo) {
          todosData.unshift({state: 'active', value: todo, id: $.uuid()})
          renderActiveTodos(todosData)
          todoComponent.render(todosData)
          toggleButtonState('#show-all')
        }
        localStorage.setItem('chui-todo', JSON.stringify(todosData))
      }
    },
    /**
     * Set state of todo:
     */
    {
      event: 'tap',
      element: '.set-state',
      callback: function() {
        const parent = $(this).closest('li').array[0]
        const id = parent.dataset.id
        parent.classList.toggle('active')
        const state = parent.classList.contains('active') ? 'active' : 'completed'
        const index = todosData.findIndex(todo => todo.id == id)
        todosData[index].state = state
        renderActiveTodos(todosData)
        localStorage.setItem('chui-todo', JSON.stringify(todosData))
      }
    },
    /**
     * Delete a todo:
     */
    {
      event: 'tap',
      element: '.delete-item',
      callback: function() {
        const id = this.dataset.id
        const index = todosData.findIndex(todo => todo.id === id)
        /**
         * Remove item from list:
         */
        todosData.splice(index, 1)
        todoComponent.render(todosData)
        renderActiveTodos(todosData)
        localStorage.setItem('chui-todo', JSON.stringify(todosData))
      }
    },
    /**
     * Handle visibility of todo items  by state:
     */
    {
      event: 'tap',
      element: 'button',
      callback: function() {
        const id = this.id
        const todoItems = $('#todo-items li')
        switch(id) {
          /**
           * Show all todos:
           */
          case 'show-all':
            todoItems.css({display: '-webkit-flex', 'display': 'flex'})
            toggleButtonState(this)
            break
          /**
           * Show only active todos:
           */
          case 'show-active':
            todoItems.forEach(item => {
              if (item.classList.contains('active')) {
                $(item).css({display: '-webkit-flex', 'display': 'flex'})
              } else {
                $(item).hide()
              }
            })
            toggleButtonState(this)
          break
          /**
           * Show only completed todos:
           */
          case 'show-completed':
            todoItems.forEach(item => {
              if (item.classList.contains('active')) {
                $(item).hide()
              } else {
                $(item).css({display: '-webkit-flex', 'display': 'flex'})
              }
            })
            toggleButtonState(this)
          break
        }
      }
    }
  ]
})
