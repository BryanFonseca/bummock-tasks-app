import React from "react";

import styles from "./DateSelector.module.css";
import { formatDate } from "../../helpers/dates";

const leftSvg = (
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
        />
    </svg>
);

const rightSvg = (
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
    </svg>
);

function determineWeekDay(date) {
    const day = date.toLocaleDateString("es", { weekday: "long" });
    return day.charAt(0).toUpperCase() + day.slice(1);
}

function DateSelector({ onNextDay, onPrevDay, date }) {
    return (
        <div className={styles.dateSelector}>
            <button onClick={onPrevDay}>{leftSvg}</button>
            <div className={styles.center}>
                <span className={styles.center__day}>
                    {determineWeekDay(date) ?? "Lunes"}
                </span>
                <span className={styles.center__date}>
                    {date ? formatDate(date) : "18/05/2001"}
                </span>
            </div>
            <button onClick={onNextDay}>{rightSvg}</button>
        </div>
    );
}

export default DateSelector;