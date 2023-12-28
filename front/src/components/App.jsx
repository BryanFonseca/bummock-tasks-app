import AddBar from "./AddBar/AddBar";
import DateSelector from "./DateSelector/DateSelector";
import TaskList from "./TaskList/TaskList";
import Task from "./Task/Task";
import Layout from "./Layout/Layout";
import { useReducer } from "react";

const INITIAL_STATE = [
    {
        id: 1,
        content: "Salvar al mundo",
        isCompleted: false,
    },
    {
        id: 2,
        content: "Llevar al perro a dar un paseo",
        isCompleted: true,
    },
];

function reducer(prevState, action) {
    switch (action.type) {
        case "addTask": {
            const task = action.payload;
            return [task, ...prevState];
        }

        case "deleteTask": {
            const taskId = action.payload;
            return [...prevState].filter((task) => task.id !== taskId);
        }

        case "flipCompletion": {
            const taskId = action.payload;
            const newState = prevState.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          isCompleted: !task.isCompleted,
                      }
                    : { ...task }
            );
            return newState;
        }

        default:
            throw new Error("Invalid action");
    }
}

function App() {
    const [tasks, dispatch] = useReducer(reducer, INITIAL_STATE);

    function handleFlipCompletion(taskId) {
        dispatch({
            type: "flipCompletion",
            payload: taskId,
        });
    }

    function handleDelete(taskId) {
        dispatch({ type: "deleteTask", payload: taskId });
    }

    function handleAdd(task) {
        dispatch({ type: "addTask", payload: task });
    }

    return (
        <Layout>
            <DateSelector />
            <AddBar onAdd={handleAdd} />
            <TaskList>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        onFlipCompletion={() => handleFlipCompletion(task.id)}
                        onDelete={() => handleDelete(task.id)}
                        {...task}
                    />
                ))}
            </TaskList>
        </Layout>
    );
}

export default App;
