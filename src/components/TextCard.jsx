import "../styles/TextCard.css";

function TextCard({ title, className, children }) {
  return (
    <section className={`textcard ${className}`}>
      <div className="textcard-title">
        <div className="icon"></div>
        <h2>{title}</h2>
      </div>
      <div className="textcard-content">{children}</div>
    </section>
  );
}

export { TextCard };
