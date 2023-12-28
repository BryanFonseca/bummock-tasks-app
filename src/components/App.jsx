import AddBar from "./AddBar/AddBar";
import DateSelector from "./DateSelector/DateSelector";
import TaskList from "./TaskList/TaskList";
import Task from "./Task/Task";
import Layout from "./Layout/Layout";
import { useReducer } from "react";
import { formatDate, parseDate } from "../helpers/dates";

const INITIAL_STATE = {
    date: formatDate(new Date()),
    tasks: [
        {
            id: 1,
            content: "Salvar al mundo",
            isCompleted: false,
            date: formatDate(new Date()),
        },
    ],
};

function reducer(prevState, action) {
    switch (action.type) {
        case "addTask": {
            const task = action.payload;
            return {
                ...prevState,
                tasks: [
                    {
                        ...task,
                        date: prevState.date,
                    },
                    ...prevState.tasks,
                ],
            };
        }

        case "deleteTask": {
            const taskId = action.payload;
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== taskId),
            };
        }

        case "flipCompletion": {
            const taskId = action.payload;
            return {
                ...prevState,
                tasks: prevState.tasks.map((task) =>
                    task.id === taskId
                        ? {
                              ...task,
                              isCompleted: !task.isCompleted,
                          }
                        : { ...task }
                ),
            };
        }

        case "changeDay": {
            const amount = action.payload;
            const { date: currentDateString } = prevState;
            const currentDate = parseDate(currentDateString);
            return {
                ...prevState,
                date: formatDate(
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate() + amount
                    )
                ),
            };
        }

        default:
            throw new Error("Invalid action");
    }
}

function App() {
    const [{ tasks, date }, dispatch] = useReducer(reducer, INITIAL_STATE);

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
            <DateSelector
                onPrevDay={() => dispatch({ type: "changeDay", payload: -1 })}
                onNextDay={() => dispatch({ type: "changeDay", payload: 1 })}
                date={parseDate(date)}
            />
            <AddBar onAdd={handleAdd} />
            <TaskList>
                {tasks.filter((task) => task.date === date).length === 0 && (
                    <em>Sin tareas</em>
                )}
                {tasks
                    .filter((task) => task.date === date)
                    .map((task) => (
                        <Task
                            key={task.id}
                            onFlipCompletion={() =>
                                handleFlipCompletion(task.id)
                            }
                            onDelete={() => handleDelete(task.id)}
                            {...task}
                        />
                    ))}
            </TaskList>
        </Layout>
    );
}

export default App;
