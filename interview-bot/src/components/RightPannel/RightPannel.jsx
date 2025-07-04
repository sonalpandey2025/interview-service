import { useSelector } from "react-redux";
import styles from "./RightPannel.module.css";
import mssg from "../../assets/mssg.svg";

const RightPanel = () => {
  const audioList = useSelector((state) => state.transcript.audioList);
  console.log("Audio List:", audioList);
  const currentQuestion = 1;
  const totalQuestions = 10;
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className={styles.rightPanel}>
      <div className={styles.headerSection}>
        <h4 className={styles.title}>Interview Chat</h4>
        <p className={styles.questionNumber}>Q {currentQuestion}/{totalQuestions}</p>
      </div>

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

         {!audioList?.length > 0 ? <div className={styles.chatPlaceholder}>
        <img src={mssg} alt="chat" />
        <p className={styles.mainText}>Interview conversation will appear here.</p>
        <p className={styles.startText}>Start the interview to begin</p>
      </div>
       : <p>{audioList.toString()}</p>}
    </div>
  );
};

export default RightPanel;
