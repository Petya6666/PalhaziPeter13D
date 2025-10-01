
# README – `UserForm.jsx` komponens (Új felhasználó hozzáadása)

Ez a dokumentum bemutatja a `UserForm.jsx` célját, a prop-okat, a jelenlegi (kapott) fájl hibáit,
majd ad egy **javított, működő példát** és használati útmutatót. A leírás 13. évfolyamos informatikus
szinthez készült, érthető, gyakorlati példákkal.

---

## 🎯 Mi ez a komponens?
A `UserForm` egy **React** űrlap komponens, amely új felhasználó **nevének** és **e-mail címének**
megadására szolgál, majd egy **Hozzáadás** gombbal továbbítja az adatokat a szülő komponens felé.

---

## ⚙️ Várt prop-ok

| Prop neve       | Típus     | Leírás |
|-----------------|-----------|--------|
| `name`          | String    | Az űrlapon lévő Név mező aktuális értéke |
| `email`         | String    | Az űrlapon lévő E-mail mező aktuális értéke |
| `setName`       | Function  | A `name` érték frissítése (vezérelt input) |
| `setEmail`      | Function  | Az `email` érték frissítése (vezérelt input) |
| `handleSubmit`  | Function  | Az űrlap elküldésekor meghívott függvény |

> A komponens **nem** tartalmaz saját állapotot a mezőkhöz: a szülő kezeli az állapotot, és prop-ként adja át.

---

## ❗ Mi a gond az eredeti fájllal?
A kapott `UserForm.jsx` nem érvényes JSX: hiányoznak a valódi `<form>`, `<input>`, `<button>` tagek,
és a cím (`### Új felhasználó…`) Markdown-fejléc formájában szerepel a JSX-ben, ami nem lesz helyes HTML.
Az `onChange` és `onSubmit` kötéseket is rendezni kell. (Ezért a fájl így nem futtatható.)

---

## ✅ Javított, működő `UserForm.jsx`
Az alábbi változat tiszta, érvényes JSX-et használ. A `handleSubmit` meghívása előtt `preventDefault()`
megakadályozza a böngésző alapértelmezett űrlap-küldését.

```jsx
// src/components/UserForm.jsx
import React from 'react';

export default function UserForm({ name, email, setName, setEmail, handleSubmit }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="name">Név</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add meg a nevet"
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pl. pelda@example.com"
          required
        />
      </div>

      <button type="submit" style={{ padding: '6px 12px' }}>Hozzáadás</button>
    </form>
  );
}
```

---

## 🧪 Példa szülő komponens (részlet)
Az alábbi példa megmutatja, hogyan kezeld az űrlap állapotát, és hogyan add át a `handleSubmit`-et.

```jsx
import React, { useState } from 'react';
import UserForm from './components/UserForm';

export default function AddUserDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = () => {
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      registrationDate: new Date().toISOString()
    };
    if (!newUser.name || !newUser.email) return; // minimális védelem
    setUsers((prev) => [newUser, ...prev]);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Új felhasználó hozzáadása</h2>
      <UserForm
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
```

---

## ✅ Ellenőrzőlista
- [ ] A `UserForm` **vezérelt inputokat** használ (`value` + `onChange`).
- [ ] A `handleSubmit` a szülőben kezeli a hozzáadást, a `UserForm` csak meghívja.
- [ ] A `form` `onSubmit`-je `preventDefault()`-ot hív.
- [ ] Kötelező mezők: `required` az inputokon.

---

## ➕ Továbbfejlesztések
- Hibakezelés (pl. üres mezők, helytelen e-mail formátum részletesebb üzenettel)
- Dizájn: CSS modulok / Tailwind / MUI
- Billentyűzet-kezelés: Enter megnyomására is küldjön (már működik a `type="submit"` miatt)

---

## 📄 Licenc
A példakód oktatási célú; szabadon felhasználható és módosítható.
