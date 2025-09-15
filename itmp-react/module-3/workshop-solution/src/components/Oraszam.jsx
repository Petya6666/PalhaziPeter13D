import { useState } from "react";

const Oraszam = ({ orakATanmenetben }) => {
  const [teljesOraszam, setTeljesOraszam] = useState(32);

  return (
    <>
      <hr />

      <section className="row">
        <div className="text-lg">Teljes óraszám:</div>
        <div className="row" style={{ gap: "0.5rem" }}>
          <button
            className="icon-button"
            onClick={() => setTeljesOraszam((prev) => prev + 1)}
          >
            +
          </button>
          <span className="font-semibold">{teljesOraszam}</span>
          <button
            className="icon-button"
            onClick={() => setTeljesOraszam((prev) => prev - 1)}
          >
            -
          </button>
        </div>
      </section>

      <section className="row">
        <div className="text-lg">Hiányzó órák:</div>
        <span className="font-semibold">
          {teljesOraszam - orakATanmenetben}
        </span>
      </section>

      <hr />
    </>
  );
};

export default Oraszam;
