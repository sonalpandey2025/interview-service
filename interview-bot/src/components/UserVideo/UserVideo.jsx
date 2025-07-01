import React, { useEffect, useRef, useState } from "react";
import styles from "./UserVideo.module.css";
import AIVideo from "../AIVideo/AIVideo";

const UserVideo = () => {
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };
    getPermissions();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            console.log("Final:", transcript);
          } else {
            console.log("Interim:", transcript);
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // restart for continuous listening
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition not supported");
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className={styles.videoWrapper}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={styles.video}
      />
      <div className={styles.timer}>00:10</div>
      <div className={styles.recording}>Recording</div>
      <div className={styles.candidate_info}>Candidate Name</div>
      
      <AIVideo />
      <button onClick={handleStartListening} className={styles.listenButton}>
        Start Listening
      </button>
    </div>
  );
};

export default UserVideo;
