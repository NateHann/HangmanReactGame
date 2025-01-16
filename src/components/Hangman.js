import React, { useEffect, useState } from "react";
import state1 from "../assets/state1.gif";
import state10 from "../assets/state10.gif";
import state11 from "../assets/state11.gif";
import state2 from "../assets/state2.gif";
import state3 from "../assets/state3.gif";
import state4 from "../assets/state4.gif";
import state5 from "../assets/state5.gif";
import state6 from "../assets/state6.gif";
import state7 from "../assets/state7.gif";
import state8 from "../assets/state8.gif";
import state9 from "../assets/state9.gif";
import "../styles/Hangman.css";

const Hangman = () => {
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [word, setWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const states = [
    state1,
    state2,
    state3,
    state4,
    state5,
    state6,
    state7,
    state8,
    state9,
    state10,
    state11,
  ];

  useEffect(() => {
    fetch("/dictionary.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dictionary file");
        }
        return response.text();
      })
      .then((text) => {
        const words = text.split("\n").map((word) => word.trim().toUpperCase());
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
      })
      .catch((err) => {
        console.error("Error fetching dictionary:", err);
        setWord("ERROR");
      });
  }, []);

  const handleGuess = (letter) => {
    setGameStarted(true);

    if (!word || guessedLetters.includes(letter) || gameOver || victory) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (word.includes(letter)) {
      setFeedback("Well done! Good guess!");
      const allLettersGuessed = word
        .split("")
        .every((char) => guessedLetters.includes(char) || char === letter);
      if (allLettersGuessed) setVictory(true);
    } else {
      setFeedback("Oops! Wrong guess!");
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= states.length - 1) setGameOver(true);
    }
  };

  const restartGame = () => {
    setWrongGuesses(0);
    setGuessedLetters([]);
    setGameOver(false);
    setVictory(false);
    setFeedback("");
    setGameStarted(false);

    fetch("/dictionary.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dictionary file");
        }
        return response.text();
      })
      .then((text) => {
        const words = text.split("\n").map((word) => word.trim().toUpperCase());
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
      })
      .catch((err) => {
        console.error("Error fetching dictionary during restart:", err);
        setWord("ERROR");
      });
  };

  const renderWord = () => {
    if (!word) return <p>Loading dictionary, please wait...</p>;

    return word.split("").map((char, index) => (
      <span key={index} className="char">
        {guessedLetters.includes(char) ? char : "_"}
      </span>
    ));
  };

  const qwertyLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="hangman-container">
      {!gameStarted && (
        <p className="game-intro">
          Come on, play a game of Hangman with Peter the Stickman!
        </p>
      )}
      {gameOver && (
        <p className="game-over">
          Game Over! The word was: <strong>{word}</strong> - Press restart to
          try again. 😢
        </p>
      )}
      {victory && (
        <p className="victory">Congratulations! You guessed the word! 😊</p>
      )}
      <img
        src={states[wrongGuesses]}
        alt={`State ${wrongGuesses}`}
        className="hangman-image"
      />
      <p className="feedback">{feedback}</p>
      <div className="word-container">{renderWord()}</div>
      <div className="letters">
        {qwertyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split("").map((letter) => (
              <button
                key={letter}
                className={`letter-button ${
                  guessedLetters.includes(letter) ? "used" : ""
                }`}
                onClick={() => handleGuess(letter)}
                disabled={
                  guessedLetters.includes(letter) || gameOver || victory
                }
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={restartGame}>
          Restart Game
        </button>
        <button className="help-button" onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Close Help" : "About"}
        </button>
      </div>
      {showHelp && (
        <div className="help-popup">
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

export default Hangman;
