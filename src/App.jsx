import { useEffect, useState } from "react";
import "./styles/App.css";
import { Card } from "./components/Card";
import {
  calculateMessage,
  shuffle,
  generateCardList,
} from "./helperFunctions.js";
import { TextCard } from "./components/TextCard.jsx";

const CARDS = [
  // Re leone
  { name: "Simba", uniqueId: "TFC-188" },
  { name: "Rafiki", uniqueId: "SSK-055" },
  { name: "Pumbaa", uniqueId: "TFC-017" },
  { name: "Timon", uniqueId: "TFC-024" },
  { name: "Mufasa", uniqueId: "SSK-150" },
  { name: "Scar", uniqueId: "SSK-093" },
  { name: "Zazu", uniqueId: "SSK-072" },
  // Topolino e amici
  { name: "Topolino", uniqueId: "URS-016" },
  { name: "Minnie", uniqueId: "SSK-126" },
  { name: "Paperino", uniqueId: "URS-008" },
  { name: "Paperon de Paperoni", uniqueId: "INK-154" },
  { name: "Pluto", uniqueId: "INK-017" },
  { name: "Pippo", uniqueId: "URS-107" },
  // La spada nella roccia
  { name: "Anacleto", uniqueId: "SSK-039" },
  { name: "Merlino", uniqueId: "SSK-142" },
  { name: "Artù", uniqueId: "SSK-194" },
  // Frozen
  { name: "Elsa", uniqueId: "TFC-042" },
  { name: "Olaf", uniqueId: "TFC-052" },
  { name: "Anna", uniqueId: "SSK-085" },
  { name: "Sven", uniqueId: "TFC-055" },
  // Lilo e Stitch
  { name: "Stitch", uniqueId: "INK-089" },
  { name: "Lilo", uniqueId: "SSK-008" },
  // La bella e la bestia
  { name: "Bella", uniqueId: "URS-036" },
  { name: "Bestia", uniqueId: "URS-103" },
  { name: "Lumière", uniqueId: "ROF-112" },
  // Raperonzolo
  { name: "Raperonzolo", uniqueId: "TFC-018" },
  // Pinocchio
  { name: "Pinocchio", uniqueId: "ROF-056" },
  // La carica dei 101
  { name: "Crudelia", uniqueId: "ROF-145" },
  { name: "Gaspare", uniqueId: "TFC-081" },
  { name: "Orazio", uniqueId: "TFC-079" },
  { name: "Pongo", uniqueId: "INK-019" },
  { name: "Peggy", uniqueId: "INK-015" },
  // Mulan
  { name: "Mulan", uniqueId: "URS-116" },
  // Winnie the pooh
  { name: "Winnie The Pooh", uniqueId: "ROF-059" },
  { name: "Tigro", uniqueId: "TFC-127" },
  // Encanto
  { name: "Bruno", uniqueId: "URS-039" },
  { name: "Mirabel", uniqueId: "URS-018" },
  { name: "Antonio", uniqueId: "URS-035" },
  // Robin Hood
  { name: "Robin Hood", uniqueId: "ROF-193" },
  { name: "Principe Giovanni", uniqueId: "SSK-147" },
  { name: "Sir Biss", uniqueId: "INK-086" },
  // La sirenetta
  { name: "Ariel", uniqueId: "URS-003" },
  { name: "Flounder", uniqueId: "TFC-145" },
  { name: "Sebastian", uniqueId: "TFC-019" },
  { name: "Ursula", uniqueId: "URS-058" },
  // Alice nel paese delle meraviglie
  { name: "Alice", uniqueId: "ROF-137" },
  // Biancaneve
  { name: "Biancaneve", uniqueId: "ROF-025" },
  { name: "Pisolo", uniqueId: "SSK-177" },
  { name: "Brontolo", uniqueId: "ROF-010" },
  // Cenerentola
  { name: "Cenerentola", uniqueId: "ROF-003" },
  // Peter Pan
  { name: "Trilli", uniqueId: "INK-022" },
  { name: "Capitan Uncino", uniqueId: "TFC-175" },
  { name: "Peter Pan", uniqueId: "URS-054" },
  // La bella addormentata
  { name: "Aurora", uniqueId: "URS-141" },
  { name: "Malefica", uniqueId: "SSK-035" },
  { name: "Filippo", uniqueId: "SSK-083" },
  // Oceania
  { name: "Moana", uniqueId: "TFC-014" },
  { name: "Maui", uniqueId: "TFC-114" },
  // Aladin
  { name: "Aladin", uniqueId: "URS-172" },
  { name: "Jasmine", uniqueId: "TFC-148" },
  { name: "Genio della Lampada", uniqueId: "TFC-076" },
  { name: "Jafar", uniqueId: "INK-042" },
];

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);

  function handleClick(targetId) {
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
    document.activeElement.blur();
  }

  useEffect(() => {
    let ignore = false;

    fetch("https://api.lorcana-api.com/bulk/cards")
      .then((response) => response.json())
      .then((cardList) => {
        // Link image url to the card list
        CARDS.forEach((specificCard) => {
          try {
            specificCard.url = cardList.filter(
              (card) => card["Unique_ID"] === specificCard.uniqueId
            )[0]["Image"];
          } catch {
            console.log(`Art for card ${specificCard.uniqueId} not found.`);
          }
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
            Benvenuto nel gioco <b>Memory</b> di <b>Disney Lorcana</b>!
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
