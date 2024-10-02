import "../styles/Card.css";

function Card({ name, onClick, backgroundImage }) {
  return (
    <button className={"card"} onClick={onClick}>
      <div
        className="card-image"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      ></div>
      <h2>{name}</h2>
    </button>
  );
}

export { Card };
