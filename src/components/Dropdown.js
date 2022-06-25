import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Dropdown(props) {
    let tasks = props.tasks;
    let setTasks = props.setTasks;
    let localStorageKey = props.localStorageKey;

    // Delete Tasks where done is true
    let clearDone = () => {
        tasks = tasks.filter((task) => task.done == false);
        setTasks([
            ...tasks,
        ])
    }

    // Reset Tasks
    let reset = () => {
        if (window.confirm('Are you sure to reset Task Data?')) {
            localStorage.removeItem(localStorageKey);
            window.location.reload();
        }
    };

    return (
        <div className="dropdown">
            <button className="btn btn-secondary w-100" type="button" data-bs-toggle="dropdown">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <div className="dropdown-menu dropdown-menu-end">
                <button type="button" className="dropdown-item" onClick={clearDone}>Clear Done</button>
                <button type="button" className="dropdown-item" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Dropdown;
