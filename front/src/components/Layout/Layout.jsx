import React from "react";
import styles from './Layout.module.css';

function Layout({ children }) {
    return <main className={styles.appContainer}>{children}</main>;
}

export default Layout;
