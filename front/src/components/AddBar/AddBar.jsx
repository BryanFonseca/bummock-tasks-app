import React, { useState } from "react";
import styles from "./AddBar.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/apiTasks";
import { isSomeDaysLess, parseDate } from "../../helpers/dates";
import useLocalStorageState from '../../hooks/useLocalStorageState';

const plusSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>
);

function AddBar({ currentDate }) {
    const queryClient = useQueryClient();
    const [taskContent, setTaskContent] = useLocalStorageState("taskContent", "");
    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            }),
    });

    function handleAdd() {
        if (!taskContent) return;
        mutate({
            content: taskContent,
            date: currentDate,
        });
        setTaskContent("");
    }

    const isDisabled = isSomeDaysLess(parseDate(currentDate), new Date());

    return (
        <div className={styles.addBar}>
            <input
                className={styles.addBar__input}
                type="text"
                placeholder={
                    isDisabled
                        ? "No se puede agregar tareas en fechas pasadas"
                        : "Agrega una tarea..."
                }
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                disabled={isDisabled}
            />
            <button onClick={handleAdd} className={styles.addBar__button}>
                {plusSvg}
            </button>
        </div>
    );
}

export default AddBar;
