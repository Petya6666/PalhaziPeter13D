const OraForm = ({
  onOraHozzaad,
  cim,
  leiras,
  setCim,
  setLeiras,
  szerkesztettKartyaId,
  setSzerkesztettKartyaId,
  onEdit,
}) => {
  function handleFormSubmit(e) {
    e.preventDefault();

    const newOra = {
      cim,
      leiras,
    };

    if (typeof szerkesztettKartyaId === "number") {
      onEdit(newOra);
      setSzerkesztettKartyaId(null);
    } else {
      onOraHozzaad(newOra);
    }

    setCim("");
    setLeiras("");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="col">
        <input
          type="text"
          placeholder="Cím"
          value={cim}
          onChange={(e) => setCim(e.target.value)}
        />
        <textarea
          placeholder="Leírás"
          rows="5"
          value={leiras}
          onChange={(e) => setLeiras(e.target.value)}
        ></textarea>
      </div>
      <aside className="col">
        <button className="btn">Hozzáadás</button>
        {typeof szerkesztettKartyaId === "number" && (
          <button
            className="btn outline"
            onClick={() => {
              setSzerkesztettKartyaId(false);
              setCim("");
              setLeiras("");
            }}
          >
            Mégsem
          </button>
        )}
      </aside>
    </form>
  );
};

export default OraForm;
