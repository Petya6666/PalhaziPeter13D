
# README – `App.jsx` (Felső szintű konténer, Full‑Stack CRUD)

Ez a dokumentum leírja, hogy mit csinál az `App.jsx`, hogyan kapcsolódik a backendhez,
milyen állapotokat és függvényeket kezel, és hogyan használja a gyerek komponenseket (`Menu`, `UserForm`, `UserTable`, `UserRow`).
A cél, hogy egy 13. évfolyamos informatikus tanuló is könnyen megértse és futtassa.

---

## 🎯 Mi a szerepe az `App.jsx`-nek?
Az `App` a **legfelső** React komponens, amely:

- Kezeli a **globális állapotot** (felhasználók listája, űrlapmezők, szerkesztési állapotok, betöltés/hiba).
- **Backend API**-t hív **Axios**-szal (lekérés, hozzáadás, módosítás, törlés).
- A logikát és az adatokat **prop-okként** továbbadja a `Menu` komponensnek, amely a nézetek között vált.

---

## 🧩 Főbb állapotok (state)
- `users`: a letöltött felhasználók tömbje
- `loading`: betöltés jelző (igaz/hamis)
- `error`: hibaüzenet szövege vagy `null`
- `name`, `email`: az **Új felhasználó** űrlap aktuális értékei
- `editingId`, `editedName`, `editedEmail`: a táblázatban épp szerkesztett sor adatai

---

## 🔌 Backend végpontok (alap beállítás)
A komponens az alábbi végpontokra hivatkozik (fejlesztői környezet):

- **GET** `http://localhost:3001/api/users` – felhasználók listája
- **POST** `http://localhost:3001/api/users` – új felhasználó hozzáadása `{ name, email }`
- **PATCH** `http://localhost:3001/api/users/:id` – felhasználó frissítése `{ name, email }`
- **DELETE** `http://localhost:3001/api/users/:id` – felhasználó törlése

> Ha másik porton fut a backend, módosítsd az URL-eket, vagy használj **környezeti változót** (lásd lentebb).

---

## 🧠 Fő függvények az `App.jsx`-ben

### `fetchData()`
- Beállítja a `loading`-ot `true`-ra
- Lekéri a felhasználókat a backendről és beírja a `users` state-be
- Hibánál kitölti az `error`-t, végül `loading = false`

### `handleSubmit(event)` – Új felhasználó
- `preventDefault()` az űrlap alap küldése ellen
- Ellenőrzi, hogy a `name` és `email` nem üres
- `POST` a backend felé; siker után újratölt (`fetchData`) és üríti a mezőket

### `handleDelete(id)` – Törlés
- `window.confirm(...)` megerősítés
- `DELETE` a backendnek; siker után `fetchData`

### `handleEditStart(user)` – Szerkesztés indítása
- Beállítja az `editingId`-t, `editedName`-et és `editedEmail`-t az adott sor alapján

### `handleUpdate(id)` – Mentés
- Validál (ne legyen üres név/e-mail)
- `PATCH` a backendnek; siker után `editingId = null` és `fetchData()`

### `handleEditCancel()` – Mégse
- `editingId = null`

---

## 🧭 Adatfolyam (röviden)
1. Az `App` betöltéskor meghívja a `fetchData()`-t (egy `useEffect`-ből), és feltölti a `users` tömböt.
2. Az `App` átadja a szükséges prop-okat a `Menu` komponensnek.
3. A `Menu` továbbadja az adatokat a `UserTable`/`UserForm` gyerekeknek.
4. A gyermek komponensek gombjai az `App`-ban deklarált handler függvényeket hívják vissza (pl. `handleUpdate`).

---

## ⚠️ Fontos megjegyzések és konzisztencia
- **Handler szignatúra egységesítés:**
  - Jelenleg az `App.jsx`-ben `handleEditStart(user)` az elvárt forma (egy egész `user` objektumot vár).
  - Ha a `UserRow`/`UserTable` a `handleEditStart(id, name, email)` formát hívja, akkor **módosítsd** az `App.jsx`-ben:

```jsx
// EREDTI:
const handleEditStart = (user) => {
  setEditingId(user.id);
  setEditedName(user.name);
  setEditedEmail(user.email);
};

// AJÁNLOTT (ha a gyerek id, name, email paramétereket küld):
const handleEditStart = (id, name, email) => {
  setEditingId(id);
  setEditedName(name);
  setEditedEmail(email);
};
```

- **Dátum mező elnevezés:** A táblázatban gyakran `registrationDate`-et használunk. A backend viszont adhat `created_at`-ot is.
  Egységesítsd az elnevezést a frontenden (átalakítással) vagy a backend válasszal.

---

## 🌐 API‑alap URL környezeti változóval (ajánlott)
Kerüld a kódban a keménykódolt `http://localhost:3001` értéket. Használj környezeti változót!

**Vite esetén:**
```env
# .env.local
VITE_API_BASE=http://localhost:3001
```
```js
// App.jsx
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3001';
await axios.get(`${API}/api/users`);
```

**Create React App esetén:**
```env
# .env.local
REACT_APP_API_BASE=http://localhost:3001
```
```js
// App.jsx
const API = process.env.REACT_APP_API_BASE || 'http://localhost:3001';
await axios.get(`${API}/api/users`);
```

---

## 🚀 Gyors indítás
1. **Backend** indítása a 3001-es porton (vagy állítsd át az `.env`-et):
   - Biztosíts **CORS**-ot, hogy a frontend elérje a szervert.
2. **Frontend** projekt telepítése és futtatása:
   ```bash
   npm install
   npm run dev   # Vite
   # vagy
   npm start     # Create React App
   ```
3. Nyisd meg a böngészőben a megadott URL-t (pl. `http://localhost:5173` vagy `http://localhost:3000`).

---

## 🧪 Gyors teszt ellenőrzések
- Betöltéskor "Adatok betöltése..." üzenet látszik, majd a felhasználók.
- Új felhasználó hozzáadása után a lista frissül.
- Szerkesztés → Mentés után az értékek módosulnak.
- Törlés megerősítés után eltávolítja a sort.
- Hiba esetén piros hibaüzenet látható.

---

## 🔧 Továbbfejlesztési ötletek
- **Validáció**: e-mail formátum ellenőrzés, üres név tiltása részletes üzenetekkel.
- **UX**: gombok letiltása betöltés/mentés közben, skeleton vagy spinner.
- **Hibakezelés**: egységes hiba-komponens; 4xx/5xx üzenetek külön.
- **Állapotkezelés**: React Query / SWR a lekérésekhez; Redux/Zustand a globális állapothoz.
- **Oldalazás/szűrés/rendezés** a `users` listára.

---

## 📄 Licenc
A dokumentáció és a mintakód oktatási célokra készült; szabadon felhasználható és módosítható.
