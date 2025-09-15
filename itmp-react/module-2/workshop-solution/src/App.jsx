import OraCard from "./components/OraCard";
import Oraszam from "./components/Oraszam";

const orak = [
  {
    oraSzam: 1,
    cim: "Bevezetés a webfejlesztésbe",
    leiras: "Weboldalak működése és HTML áttekintés.",
  },
  {
    oraSzam: 2,
    cim: "Fejlesztői környezetek",
    leiras:
      "Az online és a professzionális fejlesztői eszközök áttekintése. A Visual Studio Code telepítése és alapvető használatának bemutatása.",
  },
  {
    oraSzam: 3,
    cim: "Alapvető HTML tagek",
    leiras: "Legfontosabb tagek használata: h1-h6, p, img, a.",
  },
  {
    oraSzam: 4,
    cim: "HTML attribútumok és szövegformázás",
    leiras: "Attribútumok: id, class, és szövegformázás.",
  },
  {
    oraSzam: 5,
    cim: "HTML listák és táblázatok",
    leiras: "Listaelemek (ul, ol) és táblázatok (table).",
  },
];

const App = () => {
  return (
    <main>
      <h1>Bevezetés a programozásba</h1>

      <Oraszam orakATanmenetben={orak.length} />

      <section className="ora-grid">
        {orak.map((ora) => (
          <OraCard
            key={ora.oraSzam}
            oraSzam={`${ora.oraSzam}. óra`}
            cim={ora.cim}
          >
            {ora.leiras}
          </OraCard>
        ))}
      </section>
    </main>
  );
};

export default App;
