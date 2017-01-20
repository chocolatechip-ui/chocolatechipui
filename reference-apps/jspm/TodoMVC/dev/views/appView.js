import {todosData} from '../data/todosData';
import {todoView} from '../views/todoView';
import {renderActiveTodos} from '../controllers/renderActiveTodos';
import {toggleButtonState} from '../controllers/toggleButtonState';
export const appView = $.View({
  element: '#main',
  noTemplate: true,
  events: [
    {
      event: 'keypress',
      element: '#add-todo',
      callback: function(e) {
        if (e.keyCode == 13) {
          const todo = $('#add-todo').val();
          $('#add-todo')[0].value = '';
          if (todo) {
            todosData.unshift({state: 'active', value: todo, id: $.uuid()});
            renderActiveTodos(todosData);
            todoView.render(todosData);
            toggleButtonState('#show-all');
          }
          $.Box.set('chui-todos', todosData, (err, value) => {});
        }
      }
    },
    /**
     * Add todo item:
     */
    {
      event: 'tap',
      element: '.add',
      callback: function() {
        const todo = $('#add-todo').val();
        $('#add-todo')[0].value = '';
        if (todo) {
          todosData.unshift({state: 'active', value: todo, id: $.uuid()});
          renderActiveTodos(todosData);
          todoView.render(todosData);
          toggleButtonState('#show-all');
        }
        console.log(todosData);
        $.Box.set('chui-todos', todosData, (err, value) => {});
      }
    },
    /**
     * Set state of todo:
     */
    {
      event: 'tap',
      element: '.set-state',
      callback: function() {
        const parent = $(this).closest('li');
        const id = parent[0].dataset.id;
        parent.toggleClass('active');
        const state = parent.hasClass('active') ? 'active' : 'completed';
        const index = todosData.findIndex(todo => todo.id == id);
        todosData[index].state = state;
        renderActiveTodos(todosData);
        $.Box.set('chui-todos', todosData, (err, value) => {});
      }
    },
    /**
     * Delete a todo:
     */
    {
      event: 'tap',
      element: '.delete-item',
      callback: function() {
        const id = this.dataset.id;
        const index = todosData.findIndex(todo => todo.id === id);
        /**
         * Remove item from list:
         */
        todosData.splice(index, 1);
        todoView.render(todosData);
        renderActiveTodos(todosData);
        $.Box.set('chui-todos', todosData, (err, value) => {});
      }
    },
    /**
     * Handle visibility of todo items  by state:
     */
    {
      event: 'tap',
      element: 'button',
      callback: function() {
        const id = this.id;
        const todoItems = $('#todo-items li');
        switch(id) {
          /**
           * Show all todos:
           */
          case 'show-all':
            todoItems.css({display: '-webkit-flex',display: 'flex'});
            toggleButtonState(this);
            break;
          /**
           * Show only active todos:
           */
          case 'show-active':
            todoItems.hazClass('active').css({display: '-webkit-flex',display: 'flex'});
            todoItems.hazntClass('active').hide();
            toggleButtonState(this);
          break;
          /**
           * Show only completed todos:
           */
          case 'show-completed':
            todoItems.hazClass('active').hide();
            todoItems.hazntClass('active').css({display: '-webkit-flex',display: 'flex'});
            toggleButtonState(this);
          break;
        }
      }
    }
  ]
});