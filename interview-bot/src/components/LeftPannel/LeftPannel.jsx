import UserVideo from "../UserVideo/UserVideo";
import camIcon from "../../assets/cam.svg";
import micIcon from "../../assets/mic.svg";
import wifiIcon from "../../assets/wifi.svg";

const LeftPanel = () => {
  return (
    <div style={styles.videoSection}>
      <UserVideo />
      <div
        style={{
          position: "absolute",
          left: "1rem",
          right: "1rem",
          bottom: "0",
          padding: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // background: "red"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={camIcon}
              alt="Cam"
              style={{ width: "20px", height: "20px" }}
            />
            <div style={{ fontSize: "0.8rem", marginTop: "4px" }}>Cam</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={micIcon}
              alt="Mic"
              style={{ width: "20px", height: "20px" }}
            />
            <div style={{ fontSize: "0.8rem", marginTop: "4px" }}>Mic</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={wifiIcon}
              alt="Network"
              style={{ width: "20px", height: "20px" }}
            />
            <div style={{ fontSize: "0.8rem", marginTop: "4px" }}>Network</div>
          </div>
        </div>
        <div>
          <button
            style={{
              padding: "0.8rem 1rem",
              backgroundColor: "#32337B",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Next Questions
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  videoSection: {
    position: "relative",
    flex: 3,
    padding: "1rem",
    borderRadius: "0.5rem",
    // backgroundColor: "green",
  },
};

export default LeftPanel;
