import React from "react";

export default function SendTop() {
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <button className="send-to-top " onClick={handleToTop}>
        <i className="bx bx-chevron-up"></i>
        <span>TOP</span>
      </button>
    </div>
  );
}
