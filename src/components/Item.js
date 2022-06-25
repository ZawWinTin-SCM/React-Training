import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Item(props) {
    let index = props.index;
    let task = props.task;
    let tasks = props.tasks;
    let setTasks = props.setTasks;
    let temp = props.temp;
    let setTemp = props.setTemp;
    let clearTemp = props.clearTemp;
    let cancelUpdate = props.cancelUpdate;

    // Toggle Done
    let toggleDone = (index) => {
        tasks[index].done = !tasks[index].done;
        setTasks([
            ...tasks,
        ])
    }
    // Delete Task
    let deleteTask = (index) => {
        tasks = tasks.filter((task, key) => key != index);
        setTasks([
            ...tasks,
        ])
    }

    // Update Task
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

    if (!task.edit) {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <input className="form-check-input" type="checkbox" checked={task.done} onChange={() => toggleDone(index)} />
                <span className={'cursor-pointer' + (task.done ? ' done' : '')} onDoubleClick={() => changeInput(index)}>
                    {task.title}
                </span>
                <button className="btn text-danger" onClick={() => deleteTask(index)}>
                    <FontAwesomeIcon icon={faEraser} />
                </button>
            </div>
        );
    }
    return (
        <form onSubmit={(event) => updateTitle(event, index, task.title)}
            className="d-flex justify-content-between align-items-center">
            <input className="form-check-input" type="checkbox" checked={task.done} onChange={() => toggleDone(index)} disabled />
            <input type="text" className="form-control text-center w-75" value={task.title}
                onChange={(event) => handleTitleChange(event, index)} onBlur={cancelUpdate} required />
            <button type="button" className="btn text-danger" disabled>
                <FontAwesomeIcon icon={faEraser} />
            </button>
        </form>
    );
}

export default Item;
