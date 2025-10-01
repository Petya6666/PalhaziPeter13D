
# README – `Menu.jsx` komponens (Nézetváltó: Lista ⟷ Új felhasználó)

Ez a dokumentum elmagyarázza a `Menu.jsx` szerepét, a várt prop-okat, az eredeti fájl problémáit,
és ad egy **javított, működő** változatot. A célközönség: 13. évfolyamos informatikus tanuló.

---

## 🎯 Mi ez a komponens?
A `Menu` egy olyan **felső szintű** komponens, amely két nézet között vált:
1) **Felhasználók listája** (a `UserTable` megjelenítése)
2) **Új felhasználó hozzáadása** (a `UserForm` megjelenítése)

A váltást egy egyszerű **fül/tab** logika kezeli egy helyi állapot (`activeTab`).

---

## ⚙️ Várt prop-ok

| Prop neve           | Típus       | Leírás |
|---------------------|-------------|--------|
| `users`             | Array       | A felhasználók tömbje, átadva a `UserTable`-nek |
| `name`, `email`     | String      | Az űrlap aktuális értékei (UserForm-hoz) |
| `setName`, `setEmail` | Function  | Az űrlap értékfrissítői (UserForm-hoz) |
| `handleSubmit`      | Function    | Új felhasználó hozzáadása (UserForm-hoz) |
| `editingId`         | Number|null | Szerkesztett felhasználó ID (UserTable-hoz) |
| `editedName`, `editedEmail` | String | Szerkesztés alatt lévő értékek (UserTable-hoz) |
| `setEditedName`, `setEditedEmail` | Function | Szerkesztés értékfrissítők |
| `handleEditStart`, `handleDelete`, `handleUpdate`, `handleEditCancel` | Function | Műveletek a `UserTable`-ben |

> A `Menu` csak **továbbítja** ezeket a prop-okat a gyerek komponenseknek, és saját maga a nézetváltást kezeli.

---

## ❗ Mi a gond az eredeti fájllal?
A kapott `Menu.jsx` markupja hiányos: a gombok, a feltételes renderelés és a gyerek komponensek
beillesztése nincs rendesen lezárva/megírva, ezért a fájl így **nem renderelhető**. A `useState`-tel
végzett `activeTab` logika jó irány, de a JSX-t ki kell egészíteni.

---

## ✅ Javított, működő `Menu.jsx`
Az alábbi változat két gombbal vált a nézetek között, és a megfelelő prop-okat továbbítja a
`UserForm` és `UserTable` komponenseknek.

```jsx
// src/components/Menu.jsx
import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

export default function Menu({
  users,
  name,
  email,
  setName,
  setEmail,
  handleSubmit,
  editingId,
  editedName,
  editedEmail,
  setEditedName,
  setEditedEmail,
  handleEditStart,
  handleDelete,
  handleUpdate,
  handleEditCancel,
}) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add'

  const tabBtn = (isActive) => ({
    padding: '6px 12px',
    border: '1px solid #ddd',
    background: isActive ? '#f0f0f0' : '#fff',
    cursor: 'pointer',
    borderRadius: 4,
  });

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button style={{ ...tabBtn(activeTab === 'list'), marginRight: 8 }} onClick={() => setActiveTab('list')}>
          Felhasználók listája
        </button>
        <button style={tabBtn(activeTab === 'add')} onClick={() => setActiveTab('add')}>
          Új felhasználó hozzáadása
        </button>
      </div>

      {activeTab === 'list' ? (
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
      ) : (
        <>
          <h2>Új felhasználó hozzáadása</h2>
          <UserForm
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
```

---

## 🧪 Minimális szülő komponens (minta)
Ez a példa összeköti a `Menu`-t a szükséges állapotokkal és műveletekkel.

```jsx
// src/App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';

export default function App() {
  const [users, setUsers] = useState([]);

  // Új felhasználó űrlap állapot
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Táblázat szerkesztés állapot
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleSubmit = () => {
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      registrationDate: new Date().toISOString(),
    };
    if (!newUser.name || !newUser.email) return;
    setUsers(prev => [newUser, ...prev]);
    setName('');
    setEmail('');
  };

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
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <h1>Felhasználókezelő</h1>
      <Menu
        users={users}
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        editingId={editingId}
        editedName={editedName}
        editedEmail={editedEmail}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
        handleEditStart={handleEditStart}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleEditCancel={handleEditCancel}
      />
    </div>
  );
}
```

---

## ✅ Ellenőrzőlista
- [ ] `activeTab` alapértéke: `'list'`.
- [ ] A gombok `onClick`-je vált a tabok között.
- [ ] A `UserForm` és `UserTable` **csak** a nekik szükséges prop-okat kapják.
- [ ] A szülő komponens kezeli a listát és a szerkesztést; a `Menu` csak nézetet vált.

---

## ➕ Továbbfejlesztések
- Aktív fül vizuális jelölése (ikon, aláhúzás, ARIA attribútumok)
- Állapot megőrzése tabváltáskor (pl. űrlap részeredmények)
- Routing alapú váltás (pl. `react-router`: `/users`, `/users/new`)

---

## 📄 Licenc
A példakód oktatási célú; szabadon felhasználható és módosítható.
