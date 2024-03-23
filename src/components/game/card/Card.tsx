import "./card.css";
import { CardType } from "../Game";

type CardProps = {
  item: CardType;
  value: number;
  handleChoice: any;
  flipped: boolean;
  disabled: boolean;
};

function Card({ item, value, handleChoice, flipped, disabled }: CardProps) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(item);
    }
  };

  return (
    <div className="card" key={item.id}>
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={item.src}
          alt={`card front ${item.src}`}
          style={{
            width: value === 16 ? "7rem" : value === 24 ? "6rem" : "5rem",
            height: value === 16 ? "7rem" : value === 24 ? "6rem" : "5rem",
          }}
        />
        <img
          onClick={handleClick}
          className="back"
          src="images/cards/cover.JPEG"
          alt="card back"
          style={{
            width: value === 16 ? "7rem" : value === 24 ? "6rem" : "5rem",
            height: value === 16 ? "7rem" : value === 24 ? "6rem" : "5rem",
          }}
        />
      </div>
    </div>
  );
}

export default Card;
