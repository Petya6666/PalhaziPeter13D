import { useState } from "react";

const Temakorok = () => {
  const [temakorokMegjelenitve, setTemakorokMegjelenitve] = useState(true);

  return (
    <section style={{ padding: "0 2rem" }}>
      <button
        className="temakor-button"
        onClick={() => setTemakorokMegjelenitve((prev) => !prev)}
      >
        {temakorokMegjelenitve
          ? "Témakörök elrejtése"
          : "Témakörök megjelenítése"}
      </button>
      {temakorokMegjelenitve && (
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
      )}
    </section>
  );
};

export default Temakorok;
