import React from "react";

import styles from './TaskList.module.css';

function TaskList({ children }) {
    return <ul className={styles.list}>{children}</ul>;
}

export default TaskList;
