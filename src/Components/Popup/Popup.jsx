import React, { useEffect, useState } from "react";

const Popup = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setVisible(true);

    const interval = 30;
    const increment = 100 / (duration / interval);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: "fixed",
        top: "60px",
        right: "20px",
        minWidth: "280px",
        maxWidth: "350px",
        backgroundColor: "#ffffff", // white background
        color: "#232F3E", // Amazon dark blue text
        padding: "16px 24px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Amazon Ember', Arial, sans-serif",
        zIndex: 9999,
        transform: visible ? "translateX(0)" : "translateX(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s ease, opacity 0.4s ease",
      }}
    >
      <div style={{ fontSize: "16px", marginBottom: "8px", fontWeight: 600 }}>
         {message}
      </div>

      <div
        style={{
          height: "4px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#FF9900", 
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
