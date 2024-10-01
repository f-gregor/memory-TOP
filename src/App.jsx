import { useState } from "react";
import "./App.css";

const CARDS = [
  { id: 1, name: "Simba", cardUniqueId: "TFC-188", url: null },
  { id: 2, name: "Rafiki", cardUniqueId: "SSK-055", url: null },
  { id: 3, name: "Topolino", cardUniqueId: "URS-016", url: null },
  { id: 4, name: "Minnie", cardUniqueId: "SSK-126", url: null },
  { id: 5, name: "Anacleto", cardUniqueId: "SSK-039", url: null },
  { id: 6, name: "Merlino", cardUniqueId: "SSK-142", url: null },
  { id: 7, name: "Artù", cardUniqueId: "SSK-194", url: null },
  { id: 8, name: "Elsa", cardUniqueId: "TFC-042", url: null },
  { id: 9, name: "Olaf", cardUniqueId: "TFC-052", url: null },
  { id: 10, name: "Stitch", cardUniqueId: "AZS-072", url: null },
  { id: 11, name: "Bestia", cardUniqueId: "URS-103", url: null },
  { id: 12, name: "Raperonzolo", cardUniqueId: "URS-153", url: null },
  // { id: 13, name: "Mulan", cardUniqueId: "", url: null },
  // { id: 14, name: "Aladin", cardUniqueId: "", url: null },
  // { id: 15, name: "Jasmine", cardUniqueId: "", url: null },
  // { id: 16, name: "Cenerentola", cardUniqueId: "", url: null },
  // { id: 17, name: "Koda", cardUniqueId: "", url: null },
  // { id: 18, name: "Biancaneve", cardUniqueId: "", url: null },
];

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("");

  const calculateMessage = () => {
    let newMessage = "";

    if (clickedIds.length < CARDS.length * 0.25) {
      newMessage = "Un ottimo inizio, coraggio! ";
    } else if (clickedIds.length < CARDS.length * 0.5) {
      newMessage = "Sei quasi a meta! ";
    } else if (clickedIds.length < CARDS.length * 0.75) {
      newMessage = "Un ultimo sforzo! ";
    } else {
      newMessage = "Grande campione! ";
    }

    newMessage += `Hai cliccato su ${clickedIds.length} personaggi di ${CARDS.length}!`;

    return newMessage;
  };

  function handleClick(targetId) {
    if (clickedIds.includes(targetId)) {
      setClickedIds([]);
      if (clickedIds.length > bestScore) setBestScore(clickedIds.length);
      console.log(calculateMessage());
      setMessage(calculateMessage());
      //Scroll into view
    } else {
      setClickedIds([...clickedIds, targetId]);
      setMessage("");
    }
    document.activeElement.blur();
  }

  // Fisher-Yates Schuffle algorithm with copy
  function shuffle(array) {
    const shuffled = [...array];
    let currentIndex = shuffled.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }

    return shuffled;
  }

  return (
    <>
      <div>
        <h1>Disney Lorcana Memory Game</h1>
        <p>
          Benvenuto! Il gioco consiste nel cliccare su ciascun personaggio una
          sola volta. Cliccando due volte sullo stesso personaggio il punteggio
          ripartira da zero. Riuscirai a ottenere il punteggio massimo?
        </p>
        <p>Punteggio attuale: {clickedIds.length}</p>
        <p>Punteggio massimo: {bestScore}</p>
        {message && <button>{message}</button>}
        <div>
          {shuffle(CARDS).map((item) => {
            return (
              <button key={item.id} onClick={() => handleClick(item.id)}>
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
