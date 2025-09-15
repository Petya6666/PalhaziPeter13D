# 3. modul workshop - Űrlap-, esemény- és haladó állapotkezelés

- "Témakörök elrejtése" gomb létrehozása
- "Új óra" űrlap létrehozása
- Kártya törlése

> [!NOTE]  
> **Feladat:**  
> A 2. modulból kiindulva készítsd el a "Témakörök elrejtése" gomb funkcionalitását, valamint az űrlapot új óra létrehozására. Az óra törlése gombot is csináld meg.

<hr />

## "Témakörök elrejtése" gomb létrehozása

1. Hozz létre egy fájlt az `src/components` mappában `Temakorok.jsx` néven, majd definiálj egy üres React komponenst!

   ```jsx
   const Temakorok = () => {
     return <div>Témakörök</div>;
   };

   export default Temakorok;
   ```

2. Az `AppMasolat.jsx`-ből másold ki az témakörök szekciót megvalósító kódot az új fájlba a `<div>Témakörök</div>` helyére.

3. Hozz létre egy state-et `temakorokMegjelenitve` névvel. Ez egy `boolean` state lesz, aminek a kezdőértéke legyen `true`.

4. Kondicionális rendereléssel oldd meg azt, hogy csak akkor látszódjanak a témakörök (`<ul className="temakor-ul">...</ul>`), ha ez a state igaz.

<details>
<summary>Segítség: kondicionális renderelés (&&)</summary>

```jsx
<div>{showHello && "Szia, ITMP!"}</div>
```

</details>

5. Szintén kondicionális rendereléssel csináld meg azt, hogy a gomb a `"Témakörök elrejtése"` és a `"Témakörök megjelenítése"` értékek között váltakozzon a state értékének megfelelően. (ha `temakorokMegjelenitve` igaz, akkor `"Témakörök elrejtése"`, különben `"Témakörök megjelenítése"`)

<details>
<summary>Segítség: kondicionális renderelés (ternary operator)</summary>

```jsx
<div>{showHello ? "Szia, ITMP!" : "Nincs üdvözlés!"}</div>
```

</details>

6. A `"Témakörök elrejtése"` gombra való kattintás változtassa a `temakorokMegjelenitve` state értékét az ellenkezőjére. Mivel ez egy boolean, simán negálni tudjuk. (`!temakorokShown`)

<details>
<summary>Megoldás</summary>

```jsx
<section style={{ padding: "0 2rem" }}>
  <button
    className="temakor-button"
    onClick={() => setTemakorokMegjelenitve((prev) => !prev)}
  >
    {temakorokMegjelenitve ? "Témakörök elrejtése" : "Témakörök megjelenítése"}
  </button>
  {temakorokMegjelenitve && (
    <ul className="temakor-ul">
      <li>Bevezetés a webfejlesztésbe: HTML és CSS alapok</li>
      <li>
        Fejlesztői környezetek és eszközök: Visual Studio Code, Git használata
      </li>
      <li>
        HTML tagek és attribútumok: weboldal-struktúra és tartalom kialakítása
      </li>
      <li>CSS alapjai: formázás, színek, box modell és reszponzív design</li>
      <li>JavaScript alapok: változók, események, és DOM manipuláció</li>
      <li>Projektmunka: reszponzív weboldal tervezése és fejlesztése</li>
      <li>Hibakeresési technikák: fejlesztői eszközök és validáció</li>
      <li>Projektek bemutatása és értékelése</li>
    </ul>
  )}
</section>
```

7. Az elkészült komponensedet használd az `App.jsx`-ben: <Temakorok />

</details>

## "Új óra" űrlap létrehozása

1. Az `App.jsx`-ben az eddigi orak konstans tömb helyett definiáld state-ként a tömböt.

<details>
<summary>Segítség: hogyan kell state-et definiálni?</summary>

**Példa:**

```jsx
import { useState } from "react";

const App = () => {
  const [stateNeve, setStateNeve] = useState("kezdőérték");

  // további kód
  // return ...
};

export default App;
```

Neked a korábbi `orak` tömb értékét kell betenned a `"kezdőérték"` helyett, valamint valami beszédesebb nevet adni a state-nek.

</details>

2. Hozz létre egy komponenst az `src/components` mappába `OraForm` néven. Helyezzük át az `App.jsx`-ben lévő form-ot ebbe a komponensbe. A "Mégsem" gombra nem lesz szükség még, ezt kikommentelheted. (kommentelés JSX-ben: `<div>Szia! {/* Hogy vagy? */}</div>`, ahol `/**/` a komment) Az `App.jsx`-be helyezzük be ezt a komponenst: `<OraForm />`. Ne felejtsd el beimportálni!

3. Definiálj két state változót: `cim`, `leiras`. Oldd meg azt, hogyha az inputon valaki változtat, akkor az alkalmazás mentse el az input értékét a megfelelő state-be. Ehhez használd az `onChange` eseménykezelőt. Ne felejtsd value-ként átadni a state értékét az inputnak!

<details>
<summary>Megoldás</summary>

```jsx
import { useState } from "react";

const OraForm = () => {
  const [cim, setCim] = useState("");
  const [leiras, setLeiras] = useState("");

  return (
    <form action="#">
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
        <button className="btn outline">Mégsem</button>
      </aside>
    </form>
  );
};

export default OraForm;
```

</details>

3. Hozz létre egy függvényt `handleFormSubmit` néven az `OraForm` komponensben (a komponensen belül, a state-ek alatt).  
   Ezt a függvényt add át a `form` `onSubmit` eseménykezelőjének. Az `action` nem kell.  
   Ez a függvény egy `event` paramétert fog fogadni. Akadályozd meg a form alapértelmezett viselkedését.  
   A `cim` és `leiras` state-ek alapján hozz létre egy `newOra` változót ebben a függvényben.

4. A komponens majd egy `onOraHozzaad` nevű prop-ot fog fogadni, ami egy függvény lesz, egy paraméterrel: az új óra.  
   Erre készülj fel úgy, hogy fogadd ezt a prop-ot, majd az új `handleFormSubmit` függvényben hívd meg ezt a függvényt. A `newOra` változó legyen átadva első paraméterként. Tehát a `handleFormSubmit` függvény utolsó sora ez lesz: `onOraHozzaad(newOra);`

A megoldást [itt](./workshop-solution/src/components/OraForm.jsx) találod, hogyha elakadnál. A mentorod segítségét is bátran kérheted.

5. Az `App.jsx`-ben add át az `onOraHozzaad` prop-ot az `OraForm` komponensnek. Ez legyen egy callback, ami fogadja a `newOra` változót, és `setState` hívással hozzáadja az új órát a meglévő órákhoz. Használd az array spreading operátort: `[...myArray, "newValue"]`

<details>
<summary>Megoldás</summary>

```jsx
<OraForm onOraHozzaad={(newOra) => setOrak((prev) => [...prev, newOra])} />
```

</details>

6. Ha mindent jól csináltál, akkor működik a form.  
   Viszont ahogy látod, hozzáadás után nem törli az `input`-ok értékét, ez nem a legjobb felhasználói élmény. Ezt szorgalmi feladat megoldani!

## Kártya törlése

1. Az `OraCard` komponens fogadjon egy `onKartyaTorles` prop-ot: `const OraCard = ({ ora, index, onKartyaTorles }) => {...}`

2. Van egy szemetes emojival jelölt `button`. Ez lesz a törlés gomb.  
   Reagálj a gomb kattintására, ami szokás szerint egy callback-et fogadjon. Ebben a callback-ben hívd meg az `onKartyaTorles` függvényt (ami a prop-ból jön), és add át neki az `ora` változót.

<details>
<summary>Megoldás</summary>

```jsx
<button className="icon-button" onClick={props.onKartyaTorles}>
  🗑️
</button>
```

</details>

3. Az `App.jsx` komponensben ott, ahol kimapeljük az `OraCard`-okat, a komponensnek add át az `onKartyaTorles` függvényt is. Ez legyen egy callback, ami a JavaScript `.filter` metódusát használva update-eli a state-et, és kiszűri az aktuális azonosítójú órát, ezzel törölve azt.

<details>
<summary>Megoldás</summary>

```jsx
<section className="ora-grid">
  {orak.map((ora, index) => (
    <OraCard
      key={index}
      oraSzam={`${index + 1}. óra`}
      cim={ora.cim}
      onKartyaTorles={() =>
        setOrak((prev) => prev.filter((ora, i) => i !== index))
      }
    >
      {ora.leiras}
    </OraCard>
  ))}
</section>
```

</details>

## Szorgalmi feladat

- Jelenleg nem lehet szerkeszteni az óra kártyát, de a gomb ott van neki. Ennek a funkcionalitását készítsd el úgy, hogyha az edit gombra nyom a felhasználó, akkor betölti a kártya adatait a fenti form-ba, a "Hozzáadás" gomb lecserélődik "Ment" gombra, valamint a "Mégsem" gomb is megjelenik. Mindegyik gombnak működnie kell.

<hr />

> [!NOTE]
> Ha nem sikerült, a megoldást a [module-3/workshop-solution](./workshop-solution/) mappában találod.  
> Elakadás esetén fordulj a mentorodhoz!

> [!NOTE]
> A szorgalmi feladat megoldása itt van: [module-3/workshop-solution-with-edit](./workshop-solution-with-edit/)
