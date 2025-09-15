# 2. modul elméleti áttekintés és demo - Komponensek, prop-ok és állapotkezelés

- Mik a komponensek?
- Tanóra kártya elkészítése statikus komponensként
- Mi az a prop?
- A komponens példányok egyéni tulajdonságainak átadása prop-ok segítségével
- Adatforrás használata és map-elés
- Mik azok a hookok
- Mi az a state?
- Teljes óraszám számláló megvalósítása állapotkezeléssel

## Mik a komponensek?

- A komponens a React alkalmazások építőköve. Olyan újrafelhasználható egységek, amelyek önállóan kezelik a megjelenítést és az adatokat.

- **Miért hasznosak?**
  - Újrafelhasználhatók: Egyetlen komponenst többször is felhasználhatsz.
  - Jobb karbantarthatóság: Ha változik egy komponens logikája, csak egy helyen kell módosítanod.
  - Olvashatóbb kódot eredményez: Az alkalmazás logikája kisebb, könnyen érthető részekre bontható.

## Tanóra kártya elkészítése statikus komponensként

## Mi az a prop?

- A React egyik alapvető mechanizmusa a prop-ok használata. Ezek teszik lehetővé az adatok átvitelét egy szülőkomponensből egy gyermekkomponensbe. A prop-ok statikusak, tehát a szülő által meghatározott értéket kapják, és azt nem lehet módosítani a gyermekkomponensben. Ez az adatáramlás segít abban, hogy a komponensek egymástól függetlenül működhessenek.

- **Mi az a prop?**

  - Egy rövidítés: property (tulajdonság).
  - Objektumként kerül átadásra a komponens hívásakor.
  - Statikus adatok: Nem lehet módosítani, csak olvasni.
  - Egyirányú adatáramlás: Az adat mindig a szülőtől a gyermek irányába áramlik.

- **Miért fontos?**
  - Újrafelhasználhatóság: Ugyanaz a komponens különböző adatokat kezelhet attól függően, hogy milyen prop-okat kap.
  - Átláthatóság: Könnyen nyomon követhető az adatáramlás a komponensek között.

## Demo: A komponens példányok egyéni tulajdonságainak átadása prop-ok segítségével

## Mi az a state? (hookokról általában)

- A hook-ok a React 16.8 verziójától érhetők el, és lehetővé teszik a funkcionális komponensek számára, hogy olyan funkciókat használjanak, amelyeket korábban csak osztályalapú komponensekben lehetett elérni. A leggyakrabban használt hook-ok a useState és a useEffect.

- **Mi az a hook?**

  - Egy speciális függvény, amit csak React komponensekben hívhatunk meg.
  - Két fő szabály:
    - Csak a legfelső szinten használható (nem lehet például ciklusokban hívni).
    - Csak React komponensekben vagy saját hook-okban használható.

## Mi az a state?

- **Mi az a state?**
  - A state a React egyik alapfogalma, amely lehetővé teszi, hogy a komponensek "emlékezzenek" az aktuális állapotukra. Ez dinamikus felhasználói interakciókat tesz lehetővé, például űrlapok kitöltését vagy gombok kattintását.

## Adatforrás használata és map-elés

- **Cél:** Használjunk egy tömböt az adatok forrásaként, és a map függvénnyel dinamikusan hozzunk létre kártyákat.

## Teljes óraszám számláló
