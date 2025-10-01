
# README – `UserRow.jsx` komponens (Táblázatsor a felhasználókezeléshez)

Ez a dokumentum bemutatja a `UserRow.jsx` szerepét, a használt prop-okat, az eredeti fájlban
látható hiányosságokat, valamint egy **javított, működő megoldást** és használati példákat.
A cél, hogy egy 13. évfolyamos informatikus tanuló is könnyen megértse.

---

## 🎯 Mi ez a komponens?
A `UserRow` egy **React** függvénykomponens, amely **egyetlen felhasználó sorát** jeleníti meg
egy táblázatban. A sor képes **megjelenítésre**, **szerkesztésre**, **mentésre**, **mégse** és
**törlés** műveletekre.

Jellemzően a `UserTable` komponens `users.map(...)` hívásán belül használjuk – minden felhasználóhoz
egy `UserRow` példány tartozik.

---

## ⚙️ Elvárt prop-ok

> Az eredeti fájl a következő prop-neveket használja. (Lásd a továbbfejlesztett ajánlást is a következő szakaszban.)

| Prop neve              | Típus        | Leírás |
|------------------------|--------------|--------|
| `user`                 | Object       | A felhasználó adatai: legalább `id`, `name`, `email`, és egy dátum mező |
| `editingId`            | Number\|null | Melyik felhasználót szerkesztjük (az aktuális sor akkor szerkeszthető, ha `editingId === user.id`) |
| `editedName`           | String       | A név szerkesztés alatti értéke |
| `editedEmail`          | String       | Az e-mail szerkesztés alatti értéke |
| `setEditedName`        | Function     | A szerkesztett név frissítése (vezérelt input) |
| `setEditedEmail`       | Function     | A szerkesztett e-mail frissítése (vezérelt input) |
| `handleEditStart`      | Function     | Szerkesztés indítása az adott felhasználóra |
| `handleEditCancel`     | Function     | Szerkesztés megszakítása |
| `handleUpdate`         | Function     | Módosítások mentése az adott felhasználóra |
| `handleDelete`         | Function     | Felhasználó törlése az `id` alapján |
| `tableCellStyle`       | Object       | (Opcionális) Stílus a `td`-khez |
| `saveButtonStyle`      | Object       | (Opcionális) „Mentés” gomb stílusa |
| `cancelButtonStyle`    | Object       | (Opcionális) „Mégse” gomb stílusa |
| `editButtonStyle`      | Object       | (Opcionális) „Szerkesztés” gomb stílusa |
| `deleteButtonStyle`    | Object       | (Opcionális) „Törlés” gomb stílusa |

**Megjegyzés az adatmezőkre:** az eredeti kódban a dátum mező neve `created_at`,
míg a táblázat példáiban gyakran `registrationDate`-et használunk. Érdemes **egységesíteni** a kulcsnevet
(pl. `registrationDate`).

---

## ❗ Mi a gond az eredeti fájllal?
Az import és a prop-lista rendben van, de az eredeti JSX erősen töredezett/hiányos:

- Hiányoznak a táblázati elemek (`<tr>`, `<td>`), így a markup érvénytelen.
- A beviteli mezők és gombok nincsnek megfelelő JSX tagekben; sok helyen hiányzik a `<input>`, `<button>` nyitó/záró tag vagy az `onClick={{...}}`/`onChange={{...}}` kötés.
- A dátum mező a sorban `created_at`, ami eltérhet a többi komponensben használt kulcstól (pl. `registrationDate`).
- Inkonzisztens handler paraméterezés: egyes helyeken az egész `user` objektumot, máshol csak az `id`-t várnánk.

Ezek miatt a fájl **nem renderelhető** és futásidőben hibát okozna.

---

## ✅ Javított, működő `UserRow.jsx`
Az alábbi verzió tiszta, olvasható és a `UserTable`-lel jól együttműködik.
A szülő komponensben érdemes **`isEditing`** booleant számolni (pl. `editingId === user.id`), és azt átadni,
hogy a sor komponens egyszerű maradjon.

```jsx
// src/components/UserRow.jsx
import React from 'react';

export default function UserRow({
  user,
  isEditing,
  editedName,
  editedEmail,
  setEditedName,
  setEditedEmail,
  handleEditStart,
  handleEditCancel,
  handleUpdate,
  handleDelete,
  cellStyle,
  btn
}) {
  return (
    <tr>
      <td style={cellStyle}>{user.id}</td>

      <td style={cellStyle}>
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

      <td style={cellStyle}>
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

      <td style={cellStyle}>
        {new Date(user.registrationDate).toLocaleDateString()}
      </td>

      <td style={cellStyle}>
        {isEditing ? (
          <>
            <button style={btn.save} onClick={() => handleUpdate(user.id)}>Mentés</button>
            <button style={btn.cancel} onClick={handleEditCancel}>Mégse</button>
          </>
        ) : (
          <>
            <button style={btn.edit} onClick={() => handleEditStart(user.id, user.name, user.email)}>Szerkesztés</button>
            <button style={btn.delete} onClick={() => handleDelete(user.id)}>Törlés</button>
          </>
        )}
      </td>
    </tr>
  );
}
```

> Ha ragaszkodsz az eredeti prop-nevekhez (`editingId`, külön gomb-stílus prop-ok), az is megoldható –
> de a fenti minta **egyszerűbb**, mert egy `btn` objektumba szervezi a gombstílusokat, és az `isEditing`
> logikát a szülő komponens intézi.

---

## 🔌 Használat a `UserTable`-ben
Példa, hogyan használd a fenti `UserRow`-t a táblázatban:

```jsx
// részlet a UserTable.jsx-ből
<tbody>
  {users.map((user) => (
    <UserRow
      key={user.id}
      user={user}
      isEditing={editingId === user.id}
      editedName={editedName}
      editedEmail={editedEmail}
      setEditedName={setEditedName}
      setEditedEmail={setEditedEmail}
      handleEditStart={handleEditStart}
      handleEditCancel={handleEditCancel}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      cellStyle={tableCellStyle}
      btn={btn}
    />
  ))}
</tbody>
```

> A `btn` itt egy objektum a gombstílusokkal, pl.:
```js
const btn = {
  edit:   { padding: '6px 10px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 4, marginRight: 6 },
  delete: { padding: '6px 10px', background: '#F44336', color: '#fff', border: 'none', borderRadius: 4 },
  save:   { padding: '6px 10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 4, marginRight: 6 },
  cancel: { padding: '6px 10px', background: '#9E9E9E', color: '#fff', border: 'none', borderRadius: 4 },
};
```

---

## 🧪 Minimális szülő komponens (minta)

```jsx
import React, { useState } from 'react';
import UserRow from './UserRow';

export default function MiniTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Kiss Anna',  email: 'anna@example.com',  registrationDate: '2024-09-01' },
    { id: 2, name: 'Nagy Béla',  email: 'bela@example.com',  registrationDate: '2024-10-12' },
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

  const tableCellStyle = { border: '1px solid #ccc', padding: '10px' };
  const btn = {
    edit:   { padding: '6px 10px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 4, marginRight: 6 },
    delete: { padding: '6px 10px', background: '#F44336', color: '#fff', border: 'none', borderRadius: 4 },
    save:   { padding: '6px 10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 4, marginRight: 6 },
    cancel: { padding: '6px 10px', background: '#9E9E9E', color: '#fff', border: 'none', borderRadius: 4 },
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>#ID</th><th>Név</th><th>Email</th><th>Regisztráció</th><th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow
            key={user.id}
            user={user}
            isEditing={editingId === user.id}
            editedName={editedName}
            editedEmail={editedEmail}
            setEditedName={setEditedName}
            setEditedEmail={setEditedEmail}
            handleEditStart={handleEditStart}
            handleEditCancel={handleEditCancel}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            cellStyle={tableCellStyle}
            btn={btn}
          />
        ))}
      </tbody>
    </table>
  );
}
```

---

## ✅ Ellenőrzőlista
- [ ] A `UserRow` `<tr>`-t ad vissza, a szülő `<tbody>`-ben helyezkedik el.
- [ ] A `user` legalább `id`, `name`, `email`, `registrationDate` (vagy egységesített dátum mező) kulcsokkal rendelkezik.
- [ ] `isEditing` logika a szülőben: `editingId === user.id`.
- [ ] Vezérelt inputok: `value` + `onChange` használata.
- [ ] Gombokhoz `onClick={() => ...}` hívások.

---

## 🔧 Gyakori hibák
- **Eltérő dátumkulcs** (`created_at` vs. `registrationDate`) → egységesítsd.
- **Hiányzó JSX tagek** → Mindig legyen `<tr>` és bennük `<td>`-k.
- **Keveredő handler paraméterek** → Döntsd el: teljes `user` vagy csak `id` + (name, email) menjen tovább, és tartsd konzisztensen.

---

## 📄 Licenc
A példakód oktatási célra készült. Szabadon felhasználható és módosítható.
