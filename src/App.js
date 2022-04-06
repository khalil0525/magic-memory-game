import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // shuffle cards, this method will be called everytime we start a new game.
  const shuffleCards = () => {
    // This variable will hold an array of cardImages x 2, so that we have 2 of each card in the array. We use spread twice to achieve this
    // The array will then be shuffled using .sort method.
    // We pass it a compare function that will leave the 2 items if the number is less than 0, if number is over 0 than they will be switched
    // We then call map on the array which will transform a card by copying it's file location and adding a variable called id that is randomly generated.
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice when we click on a card back
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards. If they are the same, turn their matched property to true
  useEffect(() => {
    // If these 2 states variables are set to a card
    setDisabled(true);
    if (choiceOne && choiceTwo) {
      // If choiceOne and choiceTwo reference the same image file
      if (choiceOne.src === choiceTwo.src) {
        // Update the state of the card variable
        setCards((prevCards) => {
          // use prevState of cards and map to update the cards that were matched
          return prevCards.map((card) => {
            // If the card has the same image file as choiceOne, return an object with a spread of the previous card properties and change the matched property to true
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
              // Otherwise, if card is not one of the matched cards we leave it alone.
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  //Reset choices and increase the turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            onHandleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
