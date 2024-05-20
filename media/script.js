import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const SweetGame = () => {
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedSweet, setSelectedSweet] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [sweetList, setSweetList] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const startGame = (src) => {
    setSelectedSweet({ src });
    setGameStarted(true);
  };

  const catchSweet = (index) => {
    setScore((score) => score + 1);
    setSweetList((sweetList) => sweetList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (gameStarted) {
      const timeout = setTimeout(() => {
        setSweetList((sweetList) => [
          ...sweetList,
          {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight - 100,
          },
        ]);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [sweetList, gameStarted]);

  return (
    <div>
      {!gameStarted ? (
        <div>
          <h2>Игра: "Съешь вкусняшку"</h2>
          <button onClick={() => setGameStarted(true)}>Начать игру</button>
        </div>
      ) : (
        <div>
          <h3>Время: {seconds}</h3>
          <h3>Счет: {score}</h3>
          {sweetList.map((sweet, index) => (
            <img
              key={index}
              src={selectedSweet.src}
              style={{
                position: "absolute",
                top: `${sweet.y}px`,
                left: `${sweet.x}px`,
              }}
              onClick={() => catchSweet(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<SweetGame />, document.getElementById("root"));
