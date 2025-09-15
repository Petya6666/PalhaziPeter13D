# 2. modul workshop - Komponensek, prop-ok és állapotkezelés

- Tanóra kártya elkészítése statikus komponensként
- Órák tárolása tömbben
- Kártyák mapelése a tömb alapján
- Teljes óraszám számláló

> [!NOTE]  
> **Feladat:**  
> Az 1. modulból kiindulva hozz létre egy komponenst az óra kártyának. A kártyák adatait tárold egy tömbben, majd ezt a tömböt mapeld ki, és jelenítsd meg a tömb alapján a kártyákat. A teljes óraszám számlálót is készítsd el.

<hr />

## Tanóra kártya elkészítése statikus komponensként

1. Hozz létre egy másolatot az előző gyakorlaton létrehozott `App.jsx`-ből `AppMasolat.jsx` néven.
2. Az App.jsx-ben törölj mindent a visszaadott jsx-ből a h1 tag-en kívül. Ezeket az elemeket újra, "React-es módon" fogjuk elkészíteni.
3. Hozz létre egy fájlt az `src/components` mappában `OraCard.jsx` néven, majd definiálj egy üres React komponenst!

   ```jsx
   const OraCard = (props) => {
     return <div>OraCard</div>;
   };

   export default OraCard;
   ```

> [!WARNING]  
> Az ESLint miatt lehet, hogy a komponens ilyesmi warningot/errort dob: **"... is missing in props validation"**.  
> Megoldás: Az `eslint.config.js` fájlodat cseréld le a megoldás `eslint.config.js` fájljára! A különbség csak a 36. sor.

4. Az `AppMasolat.jsx`-ből másold ki az óra kártyát ebbe az új fájlba a `<div>OraCard</div>` helyére. (Így néz ki egy kártya: `<article className="ora">...</article>`)

5. Az `App.jsx`-ben importáld be az `OraCard` komponenst, és jeleníts meg egy kártyát a komponens segítségével. Propokban adjuk át az adatokat:

   ```jsx
   import OraCard from "./components/OraCard";
   //...
   <OraCard oraSzam="1. óra" cim="Bevezetés a webfejlesztésbe">
     Weboldalak működése és HTML áttekintés.
   </OraCard>;
   ```

6. Jelenleg az `OraCard` komponens még semmit nem csinál a neki adott propokkal. Ezen változtassunk! Az átadott prop-ok alapján cseréld le az óraszámot, a címet és a leírást.  
   A megoldást [itt](./workshop-solution/src/components/OraCard.jsx) találod.

7. Az `App.jsx`-ben hozz létre egy tömböt `orak` néven az `assets/orak.js` alapján. Ezt a tömböt még nem kell betenned a komponensbe, csak legyen ugyan abban a fájlban. A komponens definíció és az importok között van ennek jó helye.

8. Az előbb elkészített tömb alapján dinamikusan jelenítsd meg az `OraCard` komponenst. Ehhez használd a JavaScript `.map` függvényét. A kártya prop-ként fogadja az `oraSzam`-ot, valamint a `cim` stringet. A `children` legyen a leírás. Key-nek állítsuk be az óraszámot.

<details>
<summary>Megoldás</summary>

```jsx
<section className="ora-grid">
  {orak.map((ora) => (
    <OraCard key={ora.oraSzam} oraSzam={`${ora.oraSzam}. óra`} cim={ora.cim}>
      {ora.leiras}
    </OraCard>
  ))}
</section>
```

</details>

## Teljes óraszám számláló

1. Hozz létre egy fájlt az `src/components` mappában `Oraszam.jsx` néven, majd definiálj egy üres React komponenst!

   ```jsx
   const Oraszam = (props) => {
     return <div>Oraszam</div>;
   };

   export default Oraszam;
   ```

2. Az `AppMasolat.jsx`-ből másold ki az óraszám szekciót megvalósító kódot az új fájlba a `<div>Oraszam</div>` helyére. Figyelj arra, hogy mivel több taget másolsz, ezért az egészet egy React Fragment-tel kell körülvenni! `<></>`

3. Készíts egy új state-et a teljes óraszám tárolására. A kezdőérték legyen `32`.

<details>
<summary>Megoldás</summary>

```jsx
const [teljesOraszam, setTeljesOraszam] = useState(32);
```

</details>

4. Jelenítsd meg ezen state értékét a megfelelő helyen, majd a két mellette levő gombra tegyünk egy `onClick` eseménykezelőt, amivel **növelni/csökkenteni** lehet a teljes óraszámot. Ha mindent jól csináltál, már a gombok kattintásával módosítható ez a 32-es érték.

<details>
<summary>Megoldás</summary>

```jsx
<button className="icon-button" onClick={() => setTeljesOraszam(prev => prev + 1)}>+</button>
<span className="font-semibold">{teljesOraszam}</span>
<button className="icon-button" onClick={() => setTeljesOraszam(prev => prev - 1)}>-</button>
```

</details>

5. Az App.jsx-ben importáld be az Oraszam komponenst és jelenítsd meg a komponenst a h1-es tag után. Az `orakATanmenetben` propban add át az `orak` tömb hosszát.

<details>
<summary>Megoldás</summary>

```jsx
<Oraszam orakATanmenetben={orak.length} />
```

</details>

6. A hiányzó órákat már ki tudod számolni az órák tömb hosszából és a teljes órák számából. Ezt a JSX-ben elvégezhetjük kapcsos zárójelek között: `<span className="font-semibold">{teljesOraszam - props.orakATanmenetben}</span>`

<hr />

> [!NOTE]  
> Ha nem sikerült, a megoldást a [module-2/workshop-solution](./workshop-solution/) mappában találod.
> Elakadás esetén fordulj a mentorodhoz!
