import React from "react";
import styles from "./RightPannel.module.css";
import mssg from "../../assets/mssg.svg";

const RightPanel = () => {
  const currentQuestion = 1;
  const totalQuestions = 10;
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={styles.rightPanel}>
      {/* White header */}
      <div className={styles.headerSection}>
        <h4 className={styles.title}>Interview Chat</h4>
        <p className={styles.questionNumber}>Q {currentQuestion}/{totalQuestions}</p>
      </div>

      {/* Light blue progress bar section */}
      <div className={styles.progressSection}>
        <div className={styles.progressWrapper}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressPercent}>{Math.round(progress)}%</span>
        </div>
        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Gray chat area */}
      <div className={styles.chatPlaceholder}>
        <img src={mssg} alt="chat" />
        <p className={styles.mainText}>Interview conversation will appear here.</p>
        <p className={styles.startText}>Start the interview to begin</p>
      </div>
    </div>
  );
};

export default RightPanel;
