import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebaseConfig"; // Importamos Firestore

const App = () => {
  const [dice, setDice] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para guardar los datos del jugador en Firestore
  const savePlayerData = async (name, age) => {
    try {
      await addDoc(collection(db, "players"), {
        name,
        age: parseInt(age),
        rolls: [],
        date: new Date().toLocaleString(),
      });
      console.log("Jugador guardado en Firestore");
    } catch (error) {
      console.error("Error al guardar el jugador:", error);
    }
  };

  // Iniciar el juego
  const startGame = () => {
    if (name.trim() !== "" && age.trim() !== "" && !isNaN(Number(age)) && Number(age) > 0) {
      savePlayerData(name, age);
      setIsPlaying(true);
    } else {
      alert("Por favor, ingresa un nombre y una edad válida.");
    }
  };

  // Tirar el dado
  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);
  };

  return (
    <div className="container">
      {!isPlaying ? (
        <div className="form">
          <h1>🎲 Bienvenido al Simulador de Dados KR</h1>
          <input type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Ingresa tu edad" value={age} onChange={(e) => setAge(e.target.value)} />
          <button onClick={startGame}>🚀 Iniciar Juego</button>
        </div>
      ) : (
        <div className="game">
          <h2>Hola, {name}! 🎲 ¡Que comience el juego!</h2>
          <div className="dice">
            <p className="dice-number">{dice}</p>
          </div>
          <button onClick={rollDice}>🎲 Lanzar Dado</button>
        </div>
      )}
    </div>
  );
};

export default App;
