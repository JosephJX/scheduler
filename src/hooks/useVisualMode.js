import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setMode(newMode)
      const newHistory = [...history]
      newHistory.push(newMode)
      setHistory(newHistory)
      return;
    }
    //break if replace is false
    setMode(newMode)
    const newHistory = [...history]
    newHistory[newHistory.length - 1] = newMode
    setHistory(newHistory)
  }
  function back() {
    if (history.length === 1) return;
    const updatedHistory = [...history]
    updatedHistory.pop()
    setHistory(updatedHistory)
    setMode(updatedHistory.slice(-1)[0])
  }
  return { mode, transition, back };
}