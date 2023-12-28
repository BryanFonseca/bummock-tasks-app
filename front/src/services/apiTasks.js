export async function getTasksByDate(date) {
    const response = await fetch(
        `http://localhost:5000/api/tasks?date=${date}`
    );
    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`http://localhost:5000/api/task/${id}`, {
        method: "DELETE",
    });
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`http://localhost:5000/api/task/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...task
        }),
    });
    return response.json();
}

export async function changeCompletion(task) {
    const response = await fetch(`http://localhost:5000/api/task/${task.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isCompleted: task.isCompleted,
        }),
    });
    return response.json();
}
