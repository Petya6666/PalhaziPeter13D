import { useState } from "react";
import OraCard from "./components/OraCard";
import Oraszam from "./components/Oraszam";
import Temakorok from "./components/Temakorok";
import OraForm from "./components/OraForm";

const App = () => {
  const [cim, setCim] = useState("");
  const [leiras, setLeiras] = useState("");
  const [szerkesztettKartyaId, setSzerkesztettKartyaId] = useState(null);

  const [orak, setOrak] = useState([
    {
      cim: "Bevezetés a webfejlesztésbe",
      leiras: "Weboldalak működése és HTML áttekintés.",
    },
    {
      cim: "Fejlesztői környezetek",
      leiras:
        "Az online és a professzionális fejlesztői eszközök áttekintése. A Visual Studio Code telepítése és alapvető használatának bemutatása.",
    },
    {
      cim: "Alapvető HTML tagek",
      leiras: "Legfontosabb tagek használata: h1-h6, p, img, a.",
    },
    {
      cim: "HTML attribútumok és szövegformázás",
      leiras: "Attribútumok: id, class, és szövegformázás.",
    },
    {
      cim: "HTML listák és táblázatok",
      leiras: "Listaelemek (ul, ol) és táblázatok (table).",
    },
  ]);

  return (
    <main>
      <h1>Bevezetés a programozásba</h1>

      <Oraszam orakATanmenetben={orak.length} />
      <Temakorok />
      <hr />

      <OraForm
        onOraHozzaad={(ujOra) => setOrak((prev) => [...prev, ujOra])}
        cim={cim}
        leiras={leiras}
        setCim={setCim}
        setLeiras={setLeiras}
        szerkesztettKartyaId={szerkesztettKartyaId}
        setSzerkesztettKartyaId={setSzerkesztettKartyaId}
        onEdit={(ujOra) =>
          setOrak((prev) => {
            const ujOrak = [...prev];
            ujOrak[szerkesztettKartyaId] = ujOra;
            return ujOrak;
          })
        }
      />

      <section className="ora-grid">
        {orak.map((ora, index) => (
          <OraCard
            key={index}
            oraSzam={`${index + 1}. óra`}
            cim={ora.cim}
            index={index}
            onEditClick={() => {
              setCim(ora.cim);
              setLeiras(ora.leiras);
              setSzerkesztettKartyaId(index);
            }}
            onKartyaTorles={() =>
              setOrak((prev) => prev.filter((ora, i) => i !== index))
            }
          >
            {ora.leiras}
          </OraCard>
        ))}
      </section>
    </main>
  );
};

export default App;
