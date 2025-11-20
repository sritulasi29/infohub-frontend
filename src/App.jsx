import { useState } from "react";
import Weather from "./components/Weather";
import Currency from "./components/Currency";
import Quotes from "./components/Quotes";

import { AnimatePresence, motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function App() {
  const [tab, setTab] = useState("weather");
  const [dark, setDark] = useState(false);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className={dark ? "dark min-h-screen" : "min-h-screen"}>
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed inset-0 -z-10"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.6 },
          },
        }}
      />

      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 text-white text-2xl cursor-pointer">
        {dark ? (
          <BsFillSunFill onClick={() => setDark(false)} />
        ) : (
          <BsFillMoonStarsFill onClick={() => setDark(true)} />
        )}
      </div>

      {/* Title */}
      <h1 className="text-center text-5xl font-bold text-white drop-shadow-xl my-10">
        InfoHub Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 text-white font-semibold text-lg">
        <button
          onClick={() => setTab("weather")}
          className={`px-6 py-2 rounded-full ${
            tab === "weather" ? "bg-purple-600" : "bg-white/20 backdrop-blur"
          }`}
        >
          Weather
        </button>

        <button
          onClick={() => setTab("currency")}
          className={`px-6 py-2 rounded-full ${
            tab === "currency" ? "bg-purple-600" : "bg-white/20 backdrop-blur"
          }`}
        >
          Currency
        </button>

        <button
          onClick={() => setTab("quotes")}
          className={`px-6 py-2 rounded-full ${
            tab === "quotes" ? "bg-purple-600" : "bg-white/20 backdrop-blur"
          }`}
        >
          Quotes
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-xl mx-auto mt-10 glass-card p-8 rounded-3xl shadow-2xl">
        <AnimatePresence mode="wait">
          {tab === "weather" && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Weather />
            </motion.div>
          )}

          {tab === "currency" && (
            <motion.div
              key="currency"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Currency />
            </motion.div>
          )}

          {tab === "quotes" && (
            <motion.div
              key="quotes"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Quotes />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
