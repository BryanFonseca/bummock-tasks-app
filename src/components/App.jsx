import AddBar from "./AddBar/AddBar";
import DateSelector from "./DateSelector/DateSelector";
import TaskList from "./TaskList/TaskList";
import Task from "./Task/Task";
import Layout from "./Layout/Layout";

function App() {
    return (
        <Layout>
            <DateSelector />
            <AddBar />
            <TaskList>
                <Task isCompleted={true}>Salvar al mundo</Task>
                <Task isCompleted={false}>Ser mejor desarrollador</Task>
            </TaskList>
        </Layout>
    );
}

export default App;
