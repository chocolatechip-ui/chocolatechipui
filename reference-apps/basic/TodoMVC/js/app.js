$(function() {
  $('nav h1').removeAttr('style');

  /**
   * Configure $.Box for local data persistence:
   */
  $.Box.config({
    boxName: 'chui-todo-mvc'
  });

  /**
   * Setup array for todos:
   */
  var todosData = [];

  /**
   * Define Todo View:
   */
  var todoView = $.View({
    element: '#todo-items',
    variable: 'todo',
    template: '<li class="{= todo.state }">\
        <button class="set-state"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path></g></g></svg></button>\
        <h3>{= todo.value }</h3>\
        <button class="delete-item">\
          <svg width="20px" height="20px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Delete" stroke="#FF0000" stroke-width="2" stroke-linecap="square"><path d="M26.5,3.5 L3.5,26.5" id="Line"></path><path d="M3.5,3.5 L26.5,26.5" id="Line"></path></g></g></svg>\
        </button>\
      </li>'
  });

  /**
   * Define templates for singular and plural:
   */
  var todoStateTemplate = [
    '<span>{= number } item left.</span>',
    '<span>{= number } items left.</span>'
  ];

  /**
   * Define Totals View:
   */
  var TotalsView = $.View({
    element: '#totals-view',
    variable: 'number',
    template: '<span>{= data } item left.</span>'
  });
  window.TotalsView = TotalsView;

  /**
   * Display number of active todos:
   */
  function renderActiveTodos(data) {
    var active = data.filter(function(item) {
      return item.state === 'active';
    });

    function renderActiveNumber(number, active) {
      TotalsView.setTemplate(todoStateTemplate[number]);
      TotalsView.render(active);
    }
    active = active.length || 0;
    if (!active ) {
      renderActiveNumber(1, 0);
    } else if (active === 1) {
      renderActiveNumber(0, active);
    } else if (active > 1) {
      renderActiveNumber(1, active);
    }
  }

  /**
   * Get all todos stored in $.Box:
   */
  $.Box.get('chui-todos', function(err, value) {
    if (value.length) {
      value.forEach(function(todo) {
        todosData.push(todo);
      });
      todoView.render(todosData);
      renderActiveTodos(todosData);
    } else {
      renderActiveTodos(todosData);
    }
  });

  /**
   * Create a view to register events:
   */
  var AppView = $.View({
    element: 'screen',
    noTemplate: true,
    events: [
      {
        event: 'keypress',
        element: '#add-todo',
        callback: function(e) {
          if (e.keyCode == 13) {
            var todo = $('#add-todo').val();
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
      /**
       * Add todo item:
       */
      {
        event: 'tap',
        element: '.add',
        callback: function() {
          var todo = $('#add-todo').val();
          $('#add-todo')[0].value = '';
          if (todo) {
            todosData.unshift({state: 'active', value: todo});
            renderActiveTodos(todosData);
            todoView.render(todosData);
            toggleButtonState('#show-all');
          }
          $.Box.set('chui-todos', todosData, function(err, value) {});
        }
      },
      /**
       * Set state of todo:
       */
      {
        event: 'tap',
        element: '.set-state',
        callback: function() {
          var parent = $(this).closest('li');
          var index = parent.index();
          parent.toggleClass('active');
          var state = parent.hasClass('active') ? 'active' : 'completed';
          todosData[index].state = state;
          renderActiveTodos(todosData);
          $.Box.set('chui-todos', todosData, function(err, value) {});
        }
      },
      /**
       * Delete a todo:
       */
      {
        event: 'tap',
        element: '.delete-item',
        callback: function() {
          var index = $(this).closest('li').index();
          // Remove item from list:
          todosData.splice(index, 1);
          todoView.render(todosData);
          renderActiveTodos(todosData);
          $.Box.set('chui-todos', todosData, function(err, value) {});
        }
      },
      /**
       * Handle visibility of todo items  by state:
       */
      {
        event: 'tap',
        element: 'button',
        callback: function() {
          var id = this.id;
          var todoItems = $('#todo-items li');
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

  /**
   * Show todos by state:
   */

  function toggleButtonState(elem) {
    $(elem).siblings().removeClass('selected');
    $(elem).addClass('selected');
  }
});
