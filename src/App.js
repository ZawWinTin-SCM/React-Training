import bootstrap from 'bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

import InputGroup from './components/InputGroup';
import ItemList from './components/ItemList';

function App() {
    const localStorageKey = 'tasks';

    // Initial Data
    let [tasks, setTasks] = useState(() => {
        let oldTasks = JSON.parse(localStorage.getItem(localStorageKey));
        if (oldTasks) {
            oldTasks = oldTasks.map((task) => {
                task.edit = false;
                return task;
            });
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

    // Store in LocalStorage
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="App">
            <div className="card w-75 task-container">
                <div className="card-body">
                    <h1>Task List</h1>
                    <InputGroup tasks={tasks}
                        setTasks={setTasks}
                        localStorageKey={localStorageKey} />
                    <ItemList tasks={tasks}
                        setTasks={setTasks} />
                </div>
            </div>
        </div>
    );
}

export default App;
