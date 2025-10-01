
# README – `Loading.jsx` komponens (Betöltési állapot jelző)

Ez a dokumentum elmagyarázza, mit csinál a `Loading.jsx`, milyen hibák vannak az eredeti verzióban,
és ad egy **javított, hozzáférhető (a11y) és testreszabható** példát. Cél: egy 13. évfolyamos informatikus tanuló
is könnyen megértse és használja a komponenset.

---

## 🎯 Mi ez a komponens?
A `Loading` egy egyszerű **betöltési állapot jelző**. Akkor jelenik meg, amikor az alkalmazás adatokat tölt be
(pl. API hívás ideje alatt). Jelen projektben az `App.jsx` betöltéskor kiír egy "Adatok betöltése..."
üzenetet; ezt kiválthatjuk egy önálló `Loading` komponenssel. citeturn10search1[0m

---

## ❗ Mi a gond az eredeti fájllal?
A kapott `Loading.jsx` jelenleg nem **érvényes JSX**-et ad vissza: a `return` után nincs HTML/JSX elem,
csak szöveg (hiányzik pl. egy `<div>` vagy `<p>` tag). Ezt kötelező pótolni, különben a komponens hibát fog dobni. citeturn11search1[0m

Eredeti (problémás) részlet:
```jsx
function Loading() { return 
Adatok betöltése...
; }
```

---

## ✅ Javított, minimális `Loading.jsx`
Ez a legalapabb, érvényes és használható változat:

```jsx
// src/components/Loading.jsx
import React from 'react';

export default function Loading({ message = 'Adatok betöltése...' }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}
```

**Miért jó így?**
- **Hozzáférhetőség:** `role="status"`, `aria-live="polite"`, `aria-busy="true"` segít az olvasóprogramoknak.
- **Testreszabhatóság:** a `message` prop-pal megadhatsz saját üzenetet.

---

## ✨ Esztétikusabb verzió (spinnerrel)
Az alábbi példa egy CSS-alapú kör alakú spinnert jelenít meg. A mozgást minimalizáljuk, ha a felhasználó
kéri a csökkentett animációt (prefers-reduced-motion):

```jsx
// src/components/Loading.jsx
import React from 'react';

export default function Loading({ message = 'Adatok betöltése...' }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" style={styles.container}>
      <span style={styles.spinner} aria-hidden="true" />
      <span style={styles.text}>{message}</span>
    </div>
  );
}

const styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  spinner: {
    width: 16,
    height: 16,
    border: '2px solid #e5e7eb',      // világos szürke
    borderTopColor: '#3b82f6',        // kék
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: { margin: 0 }
};
```

Adj hozzá **globális CSS-be** egy `@keyframes` definíciót (pl. `src/index.css`):
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Kisegítő beállítás: ha a felhasználó csökkentett mozgást kér */
@media (prefers-reduced-motion: reduce) {
  [role="status"] [style*="animation"] {
    animation: none !important;
  }
}
```

---

## 🔌 Használat az `App.jsx`-ben
Az `App.jsx` jelenleg betöltéskor így jeleníti meg a szöveget:

```jsx
if (loading) {
  return <div className="App"><p>Adatok betöltése...</p></div>;
}
```

Cseréld ki a `Loading` komponensre:

```jsx
import Loading from './components/Loading';

if (loading) {
  return <div className="App"><Loading /></div>;
}
```

Az `App.jsx` további kontextusát lásd a projekthez mellékelt fájlban. citeturn10search1[0m

---

## ✅ Ellenőrzőlista
- [ ] A `Loading` **érvényes JSX**-et ad vissza (van gyökérelem, pl. `<div>`).
- [ ] A komponens **a11y-barát** (`role="status"`, `aria-live`, `aria-busy`).
- [ ] (Opcionális) Spinner animáció és `prefers-reduced-motion` támogatás.
- [ ] Az `App.jsx` betöltési állapotában `<Loading />` jelenjen meg a sima szöveg helyett. citeturn10search1[0m

---

## ➕ Továbbfejlesztések
- **Méret/variánsok**: `size` prop (pl. `sm`/`md`/`lg`) és/vagy `variant` (`spinner`/`dots`).
- **Központosítás**: teljes képernyős overlay változat (fixed posicionálással, háttér elhomályosítással).
- **Nem blokkoló állapot**: részleges betöltésekhez inline spinner gombokban vagy táblázatcellákban.

---

## 📄 Licenc
A példakód oktatási célokra készült; szabadon felhasználható és módosítható.
