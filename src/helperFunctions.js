function calculateMessage(clicked, total, newRecord) {
  let newMessage = "";

  if (clicked < total * 0.25) {
    newMessage = "Coraggio, è un ottimo inizio, ";
  } else if (clicked < total * 0.5) {
    newMessage = "Hai quasi raggiunto la metà: ";
  } else if (clicked < total * 0.75) {
    newMessage = "Hai superato la metà: ";
  } else if (clicked < total) {
    newMessage = "Mancava veramente poco, ";
  } else {
    newMessage = "Grande campione, ";
  }

  newMessage += `hai cliccato su ${clicked} ${
    clicked === 1 ? "personaggio" : "personaggi"
  } di ${total}!`;

  if (newRecord) newMessage += " Hai anche stabilito un nuovo record!";

  return newMessage;
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

function generateCardList(n, cards) {
  const cardList = [];
  shuffle(cards)
    .splice(0, n)
    .map((character, index) => cardList.push({ ...character, id: index + 1 }));
  return cardList;
}

export { shuffle, calculateMessage, generateCardList };
