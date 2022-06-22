import logo from './logo.svg';
import './App.css';
import React, { createElement, createRef, useState, useCallback, useEffect } from 'react';

function App() {
  const localStorageKey = 'tasks';
  let liStyle = { 'fontWeight': 500, 'margin': '0.5rem 0' };
  let btnStyle = { 'marginLeft': '0.5rem', 'cursor': 'pointer' };

  let [tasks, setTasks] = useState(() => {
    let oldTasks = JSON.parse(localStorage.getItem(localStorageKey));
    if (oldTasks) {
      return oldTasks;
    }
    return [
      { title: 'Shower a cat', done: true },
      { title: 'Walk with dog', done: false },
      { title: 'Do Homework', done: false },
      { title: 'Play game', done: true },
      { title: 'Sleep', done: false },
      { title: 'Eat a cake', done: false },
      { title: 'Learn for Exam', done: true },
    ];
  });

  let [temp, setTemp] = useState({
    id: '', title: ''
  });

  // Store in LocalStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks]);

  // Reset Tasks
  let reset = () => {
    if (window.confirm('Are you sure to reset Task Data?')) {
      localStorage.removeItem(localStorageKey);
      window.location.reload();
    }
  };

  // Add Task
  let newRef = createRef();
  let addTask = event => {
    event.preventDefault();
    setTasks([
      ...tasks,
      { title: newRef.current.value, done: false }
    ])
    newRef.current.value = null;
  }

  // Toggle Done
  let toggleDone = (index) => {
    tasks[index].done = !tasks[index].done;
    setTasks([
      ...tasks,
    ])
  }

  // Change text to input text
  let changeInput = (index) => {
    if (index != temp.id) {
      temp.id = index;
      temp.title = tasks[index].title;
      setTemp(temp);
    }

    tasks = tasks.map((task, key) => {
      task.edit = (key == index);
      return task;
    });
    setTasks([
      ...tasks,
    ])
  }
  // Handle Text Input in update
  let handleTitleChange = (event, index) => {
    tasks[index].title = event.target.value;
    setTasks([
      ...tasks,
    ])
  }
  // Update Title
  let updateTitle = (event, index, title) => {
    event.preventDefault();
    tasks[index].title = title;
    tasks[index].edit = false;
    setTasks([
      ...tasks,
    ])
    clearTemp();
  }
  // Clear Temp
  let clearTemp = () => {
    temp.id = '';
    temp.title = '';
    setTemp(temp);
  }

  let cancelUpdate = () => {
    if (temp.id != '') {
      tasks[temp.id].title = temp.title;
      tasks[temp.id].edit = false;
      setTasks([
        ...tasks,
      ])
      clearTemp();
    }
  }
  // Detect esc key in update
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      cancelUpdate();
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', escFunction);
  })

  // Delete Task
  let deleteTask = (index) => {
    tasks = tasks.filter((task, key) => key != index);
    setTasks([
      ...tasks,
    ])
  }

  // Delete Tasks where done is true
  let clearDone = () => {
    tasks = tasks.filter((task) => task.done == false);
    setTasks([
      ...tasks,
    ])
  }

  return (
    <div className="App" style={{ 'textAlign': 'left' }}>
      <div>
        <h3 style={{ "marginLeft": "2rem" }}>Task List</h3>
        <button style={{ ...btnStyle, "marginLeft": "2.75rem" }} onClick={clearDone}>Clear Done</button>
        <button style={{ ...btnStyle, "marginLeft": "2.75rem" }} onClick={reset}>Reset</button>
        <ul>
          {tasks.map((task, index) => {
            if (!task.edit) {
              let taskStyle = { minWidth: '151px', display: 'inline-block', cursor: 'pointer' };
              if (task.done) {
                taskStyle['textDecoration'] = 'line-through';
                taskStyle['fontWeight'] = 'normal';
              }
              return <li key={index} style={liStyle}>
                <input type="checkbox" checked={task.done} onChange={() => toggleDone(index)} />
                <span style={taskStyle} onDoubleClick={() => changeInput(index)}>
                  {task.title}
                </span>
                <button style={{ ...btnStyle, 'color': 'red' }} onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </li>
            }
            return <li key={index} style={liStyle}>
              <form onSubmit={(event) => updateTitle(event, index, task.title)}>
                <input type="text" value={task.title} onChange={(event) => handleTitleChange(event, index)} onBlur={cancelUpdate} required />
                <button type="button" style={{ ...btnStyle, 'color': 'red' }} disabled>
                  Delete
                </button>
              </form>
            </li>
          })}
          <form onSubmit={addTask}>
            <input type="text" ref={newRef} onFocus={cancelUpdate} required />
            <button type="submit" style={btnStyle}>Add</button>
          </form>
        </ul>
      </div>
    </div>
  );
}

export default App;
