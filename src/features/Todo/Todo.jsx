import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Button from '../../ui/Button';
import { pluralize } from '../../helpers/utils';

import './styles.css';
import Select from '../../ui/Select';

// Todo
/*

1 - Escrever um form que ao ser inputado um 
texto e pressionar Enter, o texto será inserido em uma lista

2 - Criar um Componente de Lista para receber os Itens do Todo

3 - Criar o Componente de Item

4 - Marcar o Item como concluido

5 - Filtros (All, Completed, Active)

6 - Clear Completed

7 - Select com os tipos de Task

8 - Contador

*/

class Todo extends Component {
  state = {
    title: 'My Personal Task List',
    todos: [],
    originalTodos: [],
    categs: [],
  };

  createNewTodo = value => {
    const prevTodos = [...this.state.todos];
    const newTodo = {
      id: Date.now(),
      value: value.text,
      completed: false,
      isHidden: false,
      categ: value.categ,
    };

    this.setState({ todos: [newTodo, ...prevTodos] });
  };

  completeTodoItem = selectedTodo => {
    const { todos } = this.state;

    const newTodos = todos.map(todo => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    this.setState({ todos: newTodos });
  };

  showAll = () => {
    const { todos } = this.state;
    const activesTodos = todos.map(todo => {
      return {
        ...todo,
        isHidden: false,
      };
    });

    this.setState({ todos: [...activesTodos] });
  };

  showActives = () => {
    const { todos } = this.state;
    const activesTodos = todos.map(todo => {
      return {
        ...todo,
        isHidden: todo.completed,
      };
    });

    this.setState({ todos: [...activesTodos] });
  };

  showCompleteds = () => {
    const { todos } = this.state;
    const activesTodos = todos.map(todo => {
      return {
        ...todo,
        isHidden: !todo.completed,
      };
    });

    this.setState({ todos: [...activesTodos] });
  };

  clearCompleteds = () => {
    const { todos } = this.state;
    const activesTodos = todos.filter(todo => !todo.completed);

    this.setState({ todos: [...activesTodos] });
  };

  addNewCateg = categ => {
    // completar lógica para adicionar categorias
    const prevCategs = this.state.categs;
    if (prevCategs.includes(categ)) {
      return;
    }
    this.setState({ categs: [...prevCategs, categ] });
  };

  filterByCateg = categ => {
    // completar lógica para filtrar tasks por categoria
    const { todos } = this.state;
    const activesTodos = todos.map(todo => {
      return {
        ...todo,
        isHidden: !(todo.categ === categ),
      };
    });

    this.setState({ todos: [...activesTodos] });
  };

  render() {
    const { todos, title, categs } = this.state;
    const todosCount = todos.filter(todo => !todo.isHidden);
    console.log('Todo');

    return (
      <div className="todo">
        <h1>{title}</h1>
        <Select
          options={categs}
          onChange={event => this.filterByCateg(event.target.value)}
        />

        <TodoForm
          createNewTodo={this.createNewTodo}
          addNewCateg={this.addNewCateg}
        />

        <TodoList
          todos={todos}
          title="Meu Todo List"
          completeTodoItem={this.completeTodoItem}
        />

        <div className="todo-count">
          {pluralize(todosCount, 'Item', 'Items')}{' '}
        </div>

        <span className="button-container">
          <Button onClick={this.showAll}>All</Button>
          <Button onClick={this.showActives}>Actives</Button>
          <Button onClick={this.showCompleteds}>Completed</Button>
          <Button onClick={this.clearCompleteds}>Clear Completeds</Button>
        </span>
      </div>
    );
  }
}

export default Todo;
