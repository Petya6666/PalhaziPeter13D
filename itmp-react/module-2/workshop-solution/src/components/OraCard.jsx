const OraCard = (props) => {
  return (
    <article className="ora">
      <header>
        <h3>{props.oraSzam}</h3>
        <button className="icon-button">📝</button>
        <button className="icon-button">🗑️</button>
      </header>
      <h4>{props.cim}</h4>
      <p>{props.children}</p>
    </article>
  );
};

export default OraCard;
