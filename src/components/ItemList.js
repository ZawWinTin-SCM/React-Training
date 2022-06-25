import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useCallback, useEffect } from 'react';

import Item from './Item';

function ItemList(props) {
    let tasks = props.tasks;
    let setTasks = props.setTasks;

    // Temp Data for Update
    let [temp, setTemp] = useState({
        id: '', title: ''
    });

    // Clear Temp
    let clearTemp = () => {
        temp.id = '';
        temp.title = '';
        setTemp(temp);
    }

    let cancelUpdate = () => {
        if (temp.id != '') {
            tasks[temp.id].title = temp.title;
        }
        tasks = tasks.map((task) => {
            task.edit = false;
            return task;
        });
        setTasks([
            ...tasks,
        ])
        clearTemp();
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

    return (
        <ul className="list-group list-group-flush task-list">
            {
                tasks.map((task, index) => {
                    return (
                        <li key={index} className="list-group-item">
                            <Item index={index}
                                task={task}
                                tasks={tasks}
                                setTasks={setTasks}
                                temp={temp}
                                setTemp={setTemp}
                                clearTemp={clearTemp}
                                cancelUpdate={cancelUpdate} />
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default ItemList;