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

  const width = value === 16 ? "7em" : value === 20 ? "6.5em" : "5em";
  const height = value === 16 ? "7em" : value === 20 ? "6.5em" : "5em";

  return (
    <div className="card" key={item.id}>
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={item.src}
          alt={`card front ${item.src}`}
          style={{
            width: width,
            height: height,
          }}
        />
        <img
          onClick={handleClick}
          className="back"
          src="images/cards/cover.JPEG"
          alt="card back"
          style={{
            width: width,
            height: height,
          }}
        />
      </div>
    </div>
  );
}

export default Card;
