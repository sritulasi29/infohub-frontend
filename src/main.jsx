import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ThemeProvider } from "./theme/ThemeContext";

const particlesOptions = {
  background: { color: "transparent" },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
    },
    modes: { push: { quantity: 3 }, repulse: { distance: 120, duration: 0.4 } }
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    number: { value: 60 },
    move: { enable: true, speed: 1.2 },
    opacity: { value: 0.5 },
    size: { value: 3 },
  },
  detectRetina: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Particles
        id="tsparticles"
        init={async (engine) => await loadFull(engine)}
        options={particlesOptions}
        className="fixed inset-0 -z-10"
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
