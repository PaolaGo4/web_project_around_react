export default function Cards({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <div className="element" onClick={handleCardClick}>
      <img src={card.link} alt={card.name} className="element__image" />
      <button className="element__trash"></button>
      <div className="element__info"></div>
      <h3 className="element__description">{card.name}</h3>
      <button className="element__like"></button>
      <p className="element__like-counter">{card.counter}</p>
    </div>
  );
}
