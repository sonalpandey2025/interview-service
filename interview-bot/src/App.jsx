import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import LeftPanel from "./components/LeftPannel/LeftPannel";
import RightPanel from "./components/RightPannel/RightPannel";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.panelContainer}>
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
