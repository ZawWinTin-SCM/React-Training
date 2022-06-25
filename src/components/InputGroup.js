import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { createRef } from 'react';

import Dropdown from './Dropdown';

function InputGroup(props) {
    let tasks = props.tasks;
    let setTasks = props.setTasks;
    let localStorageKey = props.localStorageKey;

    // Add Task
    let newTitleRef = createRef();
    let addTask = event => {
        event.preventDefault();
        tasks = [
            ...tasks,
            { title: newTitleRef.current.value, done: false }
        ];
        setTasks(tasks);
        newTitleRef.current.value = null;
    }

    return (
        <form onSubmit={addTask} className="my-2">
            <div className="form-group row">
                <div className="col-sm-10">
                    <input type="text" className="form-control" ref={newTitleRef} required />
                </div>
                <div className="col-sm-1 px-1">
                    <button type="submit" className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="col-sm-1 px-1">
                    <Dropdown tasks={tasks}
                        localStorageKey={localStorageKey}
                        setTasks={setTasks} />
                </div>
            </div>
        </form>
    );
}

export default InputGroup;
