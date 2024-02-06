import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import NewTask from "./components/NewTask.jsx";
import Task from "./components/Task.jsx";
import { getTasks } from "./api/tasks";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        /**
         * After component mount fetch all tasks from API
         * @function getTasks - API function
         */
        getTasks(setTasks);
    }, []);

    /**
     * Add new task local state
     * @param {Object} task - Complete object with task details
     * @param {string} task.title - Task title
     * @param {string} task.description - Task description
     * @param {string} task.status - Task status (open/closed)
     */
    const handleAddNewTask = (task) => {
        setTasks((prevTasks) => {
            return [task, ...prevTasks];
        });
    };

    /**
     * Remove task from local state
     * @param {string} id - ID of task
     */
    const handleRemoveTask = (id) => {
        setTasks((prevState) => prevState.filter((task) => task.id !== id));
    };

    return (
        <>
            <NewTask onNewTask={handleAddNewTask} />

            {tasks.map((task) => {
                return <Task key={task.id} {...task} onRemoveTask={handleRemoveTask} />;
            })}
        </>
    );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);