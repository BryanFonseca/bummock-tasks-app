import React from "react";
import styles from "./AddBar.module.css";

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

function AddBar() {
    return (
        <div className={styles.addBar}>
            <textarea
                className={styles.addBar__input}
                type="text"
                placeholder="Type a task..."
            />
            <button className={styles.addBar__button}>{plusSvg}</button>
        </div>
    );
}

export default AddBar;
