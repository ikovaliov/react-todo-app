import React, { Component } from 'react';

// COMPONENTS
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './App.css';

export default class App extends Component {
  maxId = 100;

  state = {
    items: [
      {
        id: 1,
        label: 'Drink Coffee',
        important: false,
        done: false
      },
      {
        id: 2,
        label: 'Learn React',
        important: true,
        done: false
      },
      {
        id: 3,
        label: 'Make Awesome App',
        important: false,
        done: false
      }
    ],
    filter: 'all', // all, active, done
    search: ''
  };

  deleteItem = id => {
    this.setState(({ items }) => {
      // find clicked deleted element index = element id
      const idx = items.findIndex(el => el.id === id);
      // [a, b, c, d, e]
      // [a, b,    d, e]
      const before = items.slice(0, idx);
      const after = items.slice(idx + 1);

      // Creating new array after delete one
      const newArray = [...before, ...after];

      return {
        items: newArray
      };
    });
  };

  addItem = text => {
    // generate id
    const newItem = {
      label: text,
      important: false,
      done: false,
      id: this.maxId++
    };

    // add element in array
    this.setState(({ items }) => {
      const newArr = [...items, newItem];
      return {
        items: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);

    // update object
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    // construct new array

    // const before = arr.slice(0, idx);
    // const after = arr.slice(idx + 1);
    // const newArray = [...before, newItem, ...after];
    // return {
    //   items: newArray
    // };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'important')
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'done')
      };
    });
  };

  // SEARCH WITH INPUT
  onSearchChange = search => {
    this.setState({ search });
  };

  search(items, search) {
    if (search.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  // FILTER WITH BUTTONS
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      case 'important':
        return items.filter(item => item.important);
      default:
        return items;
    }
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const { items, search, filter } = this.state;

    const visibleItems = this.filter(this.search(items, search), filter);

    const doneCount = items.filter(el => el.done).length;
    const todoCount = items.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          items={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}
