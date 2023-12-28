import AddBar from "./AddBar/AddBar";
import DateSelector from "./DateSelector/DateSelector";
import TaskList from "./TaskList/TaskList";
import Task from "./Task/Task";
import Layout from "./Layout/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasksByDate } from "../services/apiTasks";
import { formatDate, parseDate } from "../helpers/dates";

function App() {
    const [selectedDate, setSelectedDate] = useState(() =>
        formatDate(new Date())
    );
    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tasks", selectedDate],
        queryFn: () => getTasksByDate(selectedDate),
    });

    function handleChangeDate(amount) {
        const parsedDate = parseDate(selectedDate);
        const resultingDate = new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate() + amount
        );
        setSelectedDate(formatDate(resultingDate));
    }

    return (
        <Layout>
            <DateSelector
                date={parseDate(selectedDate)}
                onNextDate={() => handleChangeDate(1)}
                onPrevDate={() => handleChangeDate(-1)}
            />
            <AddBar currentDate={selectedDate} />
            {!isError && tasks?.length === 0 && <em>Sin tareas</em>}
            <TaskList>
                {isLoading && "Cargando..."}
                {!isLoading &&
                    !isError &&
                    tasks.map((task) => <Task key={task.id} {...task} />)}
            </TaskList>
        </Layout>
    );
}

export default App;
