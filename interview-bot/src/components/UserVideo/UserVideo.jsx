import React, { useEffect, useRef, useState } from "react";
import styles from "./UserVideo.module.css";
import AIVideo from "../AIVideo/AIVideo";
import { useDispatch } from "react-redux";
import { addTranscript } from "../../redux/transcriptSlice";

const UserVideo = () => {
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recording, setRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const dispatch = useDispatch();
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
            dispatch(addTranscript({ audio: transcript }));

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



  const startScreenRecording = async () => {
  try {
    // 1. Get screen stream (system audio)
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: "monitor" },
      audio: true // Capture system/tab audio (if supported)
    });

    // 2. Get mic stream
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    // 3. Create audio context for mixing audio
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();

    // 4. Connect screen audio to context
    if (screenStream.getAudioTracks().length > 0) {
      const systemSource = audioContext.createMediaStreamSource(screenStream);
      systemSource.connect(destination);
    }

    // 5. Connect mic audio to context
    if (micStream.getAudioTracks().length > 0) {
      const micSource = audioContext.createMediaStreamSource(micStream);
      micSource.connect(destination);
    }

    // 6. Combine screen video + mixed audio
    const combinedStream = new MediaStream([
      ...screenStream.getVideoTracks(),
      ...destination.stream.getAudioTracks()
    ]);

    const recorder = new MediaRecorder(combinedStream);
    const chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      screenStream.getTracks().forEach((track) => track.stop());
      micStream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  } catch (err) {
    console.error("Screen recording failed:", err);
  }
};


  const stopScreenRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className={styles.videoWrapper}>
      {/* Display the user's camera */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={styles.video}
      />

      {/* Other UI elements */}
      <div className={styles.timer}>00:10</div>
      <div className={styles.recording}>Recording</div>
      <div className={styles.candidate_info}>Candidate Name</div>

      <AIVideo />

      {/* Controls */}
      <div className={styles.controls} style={{ position: "absolute", bottom: "20px", left: "20px" }}>
        <button onClick={handleStartListening} className={styles.listenButton}>
          Start Listening
        </button>
        <button
          onClick={startScreenRecording}
          disabled={recording}
          className={styles.recordButton}
        >
          Start Recording Screen
        </button>
        <button
          onClick={stopScreenRecording}
          disabled={!recording}
          className={styles.stopButton}
        >
          Stop & Download
        </button>
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="full_app_recording.mp4"
            className={styles.downloadLink}
          >
            Download Recording
          </a>
        )}
      </div>
    </div>
  );
};

export default UserVideo;