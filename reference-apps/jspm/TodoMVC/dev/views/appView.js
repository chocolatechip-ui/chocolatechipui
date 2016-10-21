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
            todosData.unshift({state: 'active', value: todo});
            renderActiveTodos(todosData);
            todoView.render(todosData);
            toggleButtonState('#show-all');
          }
          $.Box.set('chui-todos', todosData, function(err, value) {});
        }
      }
    },
    // Add todo item:
    //===============
    {
      event: 'tap',
      element: '.add',
      callback: function() {
        const todo = $('#add-todo').val();
        $('#add-todo')[0].value = '';
        if (todo) {
          todosData.unshift({state: 'active', value: todo});
          renderActiveTodos(todosData);
          todoView.render(todosData);
          toggleButtonState('#show-all');
        }
        console.dir(todosData)
        $.Box.set('chui-todos', todosData, function(err, value) {});
      }
    },
    // Set state of todo:
    //===================
    {
      event: 'tap',
      element: '.set-state',
      callback: function() {
        const parent = $(this).closest('li');
        const index = parent.index();
        parent.toggleClass('active');
        let state = parent.hasClass('active') ? 'active' : 'completed';
        todosData[index].state = state;
        renderActiveTodos(todosData);
        $.Box.set('chui-todos', todosData, function(err, value) {});
      }
    },
    // Delete a todo:
    //===============
    {
      event: 'tap',
      element: '.delete-item',
      callback: function() {
        const index = $(this).closest('li').index();
        // Remove item from list:
        todosData.splice(index, 1);
        todoView.render(todosData);
        renderActiveTodos(todosData);
        $.Box.set('chui-todos', todosData, function(err, value) {});
      }
    },
    // Handle visibility of todo items  by state:
    //===========================================
    {
      event: 'tap',
      element: 'button',
      callback: function() {
        const id = this.id;
        const todoItems = $('#todo-items li');
        switch(id) {
          // Show all todos:
          case 'show-all':
            todoItems.css({display: '-webkit-flex',display: 'flex'});
            toggleButtonState(this);
            break;
          // Show only active todos:
          case 'show-active':
            todoItems.hazClass('active').css({display: '-webkit-flex',display: 'flex'});
            todoItems.hazntClass('active').hide();
            toggleButtonState(this);
          break;
          // Show only completed todos:
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