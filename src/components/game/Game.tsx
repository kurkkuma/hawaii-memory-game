import "./game.css";
import { useEffect, useState } from "react";
import cardImages from "../../../data.ts";
import Card from "./card/Card.tsx";

export type CardType = {
  src: string;
  matched: boolean;
  id?: number;
};

function Game({ setWon }: any) {
  const sizes = [
    {
      size: "4x4",
      value: 16,
    },
    {
      size: "6x4",
      value: 24,
    },
    {
      size: "6x5",
      value: 30,
    },
  ];
  const [cards, setCards] = useState<CardType[] | []>([]);
  const [size, setSize] = useState(sizes[0].size);
  const [value, setValue] = useState(sizes[0].value);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = (count: number) => {
    const updatedCards = cardImages
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    const shuffledCards = [...updatedCards, ...updatedCards]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        id: index,
      }));

    setWon(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  const handleChoice = (card: CardType) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const startGame = () => {
    shuffleCards(value / 2);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((item) => {
            if (item.src === choiceOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const allMatched = cards.every((item) => item.matched === true);
    if (allMatched) {
      setWon(true);
    }
    console.log(allMatched);
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    startGame();
  }, [size]);

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-container">
      <div className="sizes">
        {sizes.map((item) => {
          return (
            <div
              className={item.value === value ? "active" : ""}
              key={item.value}
              onClick={() => {
                setValue(item.value);
                setSize(item.size);
              }}
            >
              {item.size}
            </div>
          );
        })}
      </div>
      <button onClick={() => startGame()} className="btn-new-game">
        🌺 New Game 🌺
      </button>

      <div
        className="card-grid"
        style={{ gridTemplateColumns: "1fr ".repeat(Number(size.slice(0, 1))) }}
      >
        {cards.map((item) => {
          return (
            <Card
              key={item.id}
              item={item}
              value={value}
              handleChoice={handleChoice}
              flipped={item === choiceOne || item === choiceTwo || item.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Game;
