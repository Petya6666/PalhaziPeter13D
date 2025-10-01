
# README – `UserTable.jsx` komponens (Felhasználókezelő táblázat)

Ez a dokumentum elmagyarázza a `UserTable.jsx` fájl célját, működését, a szükséges prop-okat,
az eredeti kódban található hiányosságokat, és tartalmaz egy **javított, működő példát** is.
Úgy írtuk, hogy egy 13. évfolyamos informatikus tanuló is könnyen megértse és használni tudja.

---

## 🎯 Mi ez a komponens?
A `UserTable` egy **React** függvénykomponens, amely **táblázat** formában jeleníti meg a
felhasználókat, és támogatja a következő műveleteket:

- **Szerkesztés** (név és e-mail)
- **Mentés** (módosítások jóváhagyása)
- **Mégse** (szerkesztés megszakítása)
- **Törlés** (felhasználó eltávolítása a listából)

> A valódi adatmódosításokért/mentésért általában egy **szülő komponens** felel, amely átadja a
> szükséges állapotokat és függvényeket prop-okként.

---

## 📦 Előfeltételek
- Telepített **Node.js** és **npm**
- Egy működő **React** projekt (pl. Vite vagy Create React App)
- Alapismeret: **JSX**, **state/props**, **listák renderelése** `.map()`-pal

---

## 🗂️ Hová tegyem a fájlt?
Javasolt mappastruktúra:

```
src/
  components/
    UserTable.jsx
  App.jsx
```

Ha külön sor-komponenst is szeretnél, hozhatsz létre `UserRow.jsx`-t is a `components` mappában.

---

## ⚙️ Prop-ok (mit vár a komponens a szülőtől?)

| Prop neve           | Típus     | Leírás |
|---------------------|-----------|--------|
| `users`             | Array     | A felhasználók listája, pl. `{ id, name, email, registrationDate }` |
| `editingId`         | Number\|null | Melyik felhasználót szerkesztjük (ha nincs, `null`) |
| `editedName`        | String    | A szerkesztés alatt lévő név értéke |
| `editedEmail`       | String    | A szerkesztés alatt lévő e-mail értéke |
| `handleEditStart`   | Function  | Szerkesztés indítása: beállítja az `editingId`-t és a szerkesztési mezőket |
| `handleDelete`      | Function  | Felhasználó törlése az `id` alapján |
| `handleUpdate`      | Function  | Módosítások mentése az aktuális `id`-ra |
| `handleEditCancel`  | Function  | Szerkesztés megszakítása (állapotok visszaállítása) |
| `setEditedName`     | Function  | Név beviteli mező értékének frissítése |
| `setEditedEmail`    | Function  | E-mail beviteli mező értékének frissítése |

**Megjegyzés:** a komponens **nem** tartalmaz saját állapotkezelést a felhasználókhoz, mindent a
szülő komponens ad át (ez jó gyakorlat, mert így a `UserTable` „butább”, könnyebb tesztelni és újrahasználni).

---

## ❗ Hiányosságok az eredeti fájlban
Az eredetileg kapott `UserTable.jsx` vázban a következő problémák voltak:
- A `users.map(...)` rész **üres**, így **nem** jelenít meg sorokat.
- Több **inline stílusobjektum** definiálva van, de **nincs alkalmazva** az elemekre.
- A táblázatban üres lista esetén `colspan` szerepelt, React-ben helyesen **`colSpan`**.
- Hiányzik a szerkezeti `<thead>` és `<tbody>` tag (bár React nélkülük is megjelenít, érdemes használni).
- Importálva van egy `UserRow` komponens, de **nincs használva**.

---

## ✅ Javított, működő `UserTable.jsx`
Az alábbi változat azonnal használható. Tartalmazza a sorok renderelését, a gombok működését,
és az alap stílusokat (egyszerű, inline módon, hogy minden egy helyen legyen).

```jsx
// src/components/UserTable.jsx
import React from 'react';

function UserTable({
  users,
  editingId,
  editedName,
  editedEmail,
  handleEditStart,
  handleDelete,
  handleUpdate,
  handleEditCancel,
  setEditedName,
  setEditedEmail
}) {
  const tableHeaderStyle = { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f7f7f7' };
  const tableCellStyle   = { border: '1px solid #ccc', padding: '10px', textAlign: 'left' };
  const noUsersCellStyle = { border: '1px solid #ccc', padding: '12px', textAlign: 'center' };

  const btn = {
    base:    { padding: '6px 10px', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 },
    edit:    { backgroundColor: '#2196F3', marginRight: 6 },
    del:     { backgroundColor: '#F44336' },
    save:    { backgroundColor: '#4CAF50', marginRight: 6 },
    cancel:  { backgroundColor: '#9E9E9E' },
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>#ID</th>
          <th style={tableHeaderStyle}>Név</th>
          <th style={tableHeaderStyle}>Email</th>
          <th style={tableHeaderStyle}>Regisztráció</th>
          <th style={tableHeaderStyle}>Műveletek</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => {
            const isEditing = editingId === user.id;
            return (
              <tr key={user.id}>
                <td style={tableCellStyle}>{user.id}</td>

                <td style={tableCellStyle}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>

                <td style={tableCellStyle}>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td style={tableCellStyle}>
                  {new Date(user.registrationDate).toLocaleDateString()}
                </td>

                <td style={tableCellStyle}>
                  {isEditing ? (
                    <>
                      <button style={{ ...btn.base, ...btn.save }} onClick={() => handleUpdate(user.id)}>Mentés</button>
                      <button style={{ ...btn.base, ...btn.cancel }} onClick={handleEditCancel}>Mégse</button>
                    </>
                  ) : (
                    <>
                      <button style={{ ...btn.base, ...btn.edit }} onClick={() => handleEditStart(user.id, user.name, user.email)}>Szerkesztés</button>
                      <button style={{ ...btn.base, ...btn.del }} onClick={() => handleDelete(user.id)}>Törlés</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td style={noUsersCellStyle} colSpan={5}>Nincsenek felhasználók az adatbázisban.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
```

---

## 🧪 Szülő komponens példa (`App.jsx`)
Az alábbi példa megmutatja, hogyan adod át a szükséges prop-okat és hogyan kezeled az állapotokat.

```jsx
// src/App.jsx
import React, { useState } from 'react';
import UserTable from './components/UserTable';

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Kiss Anna',  email: 'anna@example.com',  registrationDate: '2024-09-01' },
    { id: 2, name: 'Nagy Béla',  email: 'bela@example.com',  registrationDate: '2024-10-12' },
    { id: 3, name: 'Tóth Csaba', email: 'csaba@example.com', registrationDate: '2025-02-20' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleEditStart = (id, name, email) => {
    setEditingId(id);
    setEditedName(name);
    setEditedEmail(email);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditedName('');
    setEditedEmail('');
  };

  const handleUpdate = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, name: editedName.trim(), email: editedEmail.trim() } : u));
    handleEditCancel();
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    if (editingId === id) handleEditCancel();
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h1>Felhasználókezelés</h1>
      <UserTable
        users={users}
        editingId={editingId}
        editedName={editedName}
        editedEmail={editedEmail}
        handleEditStart={handleEditStart}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleEditCancel={handleEditCancel}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
      />
    </div>
  );
}
```

---

## 🚀 Gyors indítás (példák)
**Vite** projektben:
```bash
npm install
npm run dev
```

**Create React App** projektben:
```bash
npm install
npm start
```
> A pontos parancs attól függ, mivel hoztad létre a projektet. Nézd meg a `package.json`-t.

---

## 🧠 Magyarázat röviden (mit érdemes megjegyezni?)
- **`colSpan`**: JSX-ben camelCase, *nem* `colspan`.
- **Listák renderelése**: mindig adj **`key`** prop-ot (pl. `key={user.id}`).
- **Vezérelt inputok**: `value` + `onChange` páros, a state a szülőben lakik.
- **Szerkezet**: használd a `<thead>` és `<tbody>` tageket az átláthatóságért.
- **Dátum megjelenítés**: `new Date(...).toLocaleDateString()` egyszerű és elég jó kiindulás.

---

## 🔧 Gyakori hibák és megoldások
1) **Nem történik semmi Szerkesztésre** → Ellenőrizd, hogy a `handleEditStart` tényleg beállítja az `editingId`, `editedName`, `editedEmail` állapotokat.
2) **Mentés után nem frissül** → A `handleUpdate`-ben biztosan a jó `id`-t kapod, és a `setUsers` a megfelelő objektumot módosítja?
3) **Hibás attribútum** → `colSpan` helyett véletlenül `colspan` van a JSX-ben.
4) **Stílus nem látszik** → Ha inline stílusokat használsz, `style={{ ... }}` tényleg rajta van az elemen?

---

## ➕ Továbbfejlesztési ötletek
- `UserRow.jsx` külön komponens a soroknak (tiszta kód, könnyebb tesztelés)
- Beviteli **validáció** (üres név, e-mail formátum)
- **Confirm** ablak törlés előtt
- **UX**: mentés közbeni állapot, hibaüzenetek
- **CSS/Tailwind/MUI** a szebb UI-hoz
- **TypeScript** típusokkal (`User`, prop-ok)
- **Backend/API** integráció (GET/PUT/DELETE, optimista frissítés)

---

## ℹ️ Verzió és kompatibilitás
- A példák **React 18+** környezetben tesztelhetők.
- Modern böngészőkben működik. Ha régi környezetet célzol, érdemes polyfilleket használni.

---

## 📄 Licenc
Ez a dokumentum és a példa kód **oktatási célra** készült. Szabadon felhasználhatod és módosíthatod a saját projektedben.

