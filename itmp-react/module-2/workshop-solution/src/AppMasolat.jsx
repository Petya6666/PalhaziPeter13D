const App = () => {
  return (
    <main>
      <h1>Bevezetés a programozásba</h1>
      <hr />

      <section className="row">
        <div className="text-lg">Teljes óraszám:</div>
        <div className="row" style={{ gap: "0.5rem" }}>
          <button className="icon-button">+</button>
          <span className="font-semibold">32</span>
          <button className="icon-button">-</button>
        </div>
      </section>

      <section className="row">
        <div className="text-lg">Hiányzó órák:</div>
        <span className="font-semibold">29</span>
      </section>

      <hr />

      <section style={{ padding: "0 2rem" }}>
        <button className="temakor-button">Témakörök elrejtése</button>
        <ul className="temakor-ul">
          <li>Bevezetés a webfejlesztésbe: HTML és CSS alapok</li>
          <li>
            Fejlesztői környezetek és eszközök: Visual Studio Code, Git
            használata
          </li>
          <li>
            HTML tagek és attribútumok: weboldal-struktúra és tartalom
            kialakítása
          </li>
          <li>
            CSS alapjai: formázás, színek, box modell és reszponzív design
          </li>
          <li>JavaScript alapok: változók, események, és DOM manipuláció</li>
          <li>Projektmunka: reszponzív weboldal tervezése és fejlesztése</li>
          <li>Hibakeresési technikák: fejlesztői eszközök és validáció</li>
          <li>Projektek bemutatása és értékelése</li>
        </ul>
      </section>

      <hr />

      <form action="#">
        <div className="col">
          <input type="text" placeholder="Cím" />
          <textarea placeholder="Leírás" rows="5"></textarea>
        </div>
        <aside className="col">
          <button className="btn">Hozzáadás</button>
          <button className="btn outline">Mégsem</button>
        </aside>
      </form>

      <section className="ora-grid">
        <article className="ora">
          <header>
            <h3>1. óra</h3>
            <button className="icon-button">📝</button>
            <button className="icon-button">🗑️</button>
          </header>
          <h4>Bevezetés a webfejlesztésbe</h4>
          <p>Weboldalak működése és HTML áttekintés.</p>
        </article>
      </section>
    </main>
  );
};

export default App;
