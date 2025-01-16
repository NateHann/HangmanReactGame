import React, { useState } from "react";
import "../styles/Help.css";

const Help = () => {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="help-container">
      <button className="help-button" onClick={toggleRules}>
        {showRules ? "Hide Help" : "Show Help"}
      </button>
      {showRules && (
        <div className="rules">
          <h3>Game Rules</h3>
          <ul>
            <li>Guess the word by selecting letters one at a time.</li>
            <li>Each incorrect guess adds a part to the hangman figure.</li>
            <li>Win by guessing all letters before the hangman is complete.</li>
            <li>Lose if the figure is fully drawn.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Help;
