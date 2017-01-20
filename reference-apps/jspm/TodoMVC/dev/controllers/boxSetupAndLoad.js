import {todosData} from '../data/todosData';
import {todoView} from '../views/todoView';
import {renderActiveTodos} from '../controllers/renderActiveTodos';
import '../src/promises';
import '../src/box';

export function boxSetupAndLoad() {

  // Configure $.Box for
  // local data persistence:
  //========================
  $.Box.config({
    boxName: 'chui-todo-mvc'
  });

  // Get all todos stored in $.Box:
  //===============================
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
}