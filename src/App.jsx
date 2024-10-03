import { useEffect, useState } from "react";
import "./styles/App.css";
import { Card } from "./components/Card";
import { TextCard } from "./components/TextCard.jsx";
import { CARDS } from "./cardList.js";
import {
  calculateMessage,
  shuffle,
  generateCardList,
} from "./helperFunctions.js";

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const scoresElement = document.querySelector(".scores");

  function handleClick(targetId) {
    document.activeElement.blur();
    if (clickedIds.includes(targetId)) {
      setClickedIds([]);
      if (clickedIds.length > bestScore) setBestScore(clickedIds.length);
      setMessage(
        calculateMessage(
          clickedIds.length,
          selectedCards.length,
          clickedIds.length > bestScore
        )
      );
    } else if (clickedIds.length === 11) {
      setClickedIds([]);
      if (clickedIds.length + 1 > bestScore)
        setBestScore(clickedIds.length + 1);
      setMessage(
        calculateMessage(
          clickedIds.length + 1,
          selectedCards.length,
          clickedIds.length + 1 > bestScore
        )
      );
    } else {
      setClickedIds([...clickedIds, targetId]);
      setMessage("");
    }
    scoresElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    let ignore = false;

    fetch("https://api.lorcana-api.com/bulk/cards")
      .then((response) => response.json())
      .then((cardList) => {
        // Link image url to the card list
        CARDS.forEach((specificCard) => {
          specificCard.url = cardList.filter(
            (card) => card["Unique_ID"] === specificCard.uniqueId
          )[0]["Image"];
        });
        // Generate a random set of 12 cards
        if (!ignore) {
          setSelectedCards(generateCardList(12, CARDS));
        }
      });

    return () => (ignore = true);
  }, []);

  return (
    <>
      <header>
        <h1>Disney Lorcana Memory Game</h1>
      </header>
      <main>
        <TextCard title="Istruzioni" className="instructions">
          <p>
            Benvenuto nel gioco <b>Memory</b> con i personaggi di{" "}
            <b>Disney Lorcana</b>!
          </p>
          <p>
            Il gioco consiste nel cliccare su ciascun personaggio una sola
            volta. Cliccando due volte sullo stesso personaggio il punteggio
            ripartirà da zero.
          </p>
          <p>
            <b> Riuscirai ad ottenere il punteggio massimo?</b>
          </p>
        </TextCard>
        <TextCard title="Punteggi" className="scores">
          <p>
            Punteggio attuale: <b>{clickedIds.length}</b>
          </p>
          <p>
            Punteggio massimo: <b>{bestScore}</b>
          </p>
        </TextCard>
        {message && (
          <TextCard title="Risultato" className="result">
            <p>{message}</p>
            <button
              onClick={() => {
                setSelectedCards(generateCardList(12, CARDS));
                setMessage("");
              }}
            >
              Cambia personaggi
            </button>
          </TextCard>
        )}
        <div className={"card-container"}>
          {selectedCards.length === 0 && <p>Sto caricando le carte...</p>}
          {shuffle(selectedCards).map((item) => (
            <Card
              key={item.id}
              onClick={() => handleClick(item.id)}
              name={item.name}
              backgroundImage={item.url}
            />
          ))}
        </div>
      </main>
      <footer>
        <p>
          Images are fetched from{" "}
          <a href="https://lorcana-api.com/">Lorcana-api.com</a>. Lorcana is a
          respective trademark of Disney/Ravensburger.
        </p>
      </footer>
    </>
  );
}

export default App;
