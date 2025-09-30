import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Menu from './components/Menu';

function App() {
  // --- STATE VÁLTOZÓK ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  // --- FUNKCIÓK ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Hiba az adatok lekérésekor:", err);
      setError("Nem sikerült betölteni az adatokat. Ellenőrizze, hogy a backend szerver fut-e a 3001-es porton.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email) {
      alert("A név és az email megadása kötelező!");
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/users', { name, email });
      fetchData();
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Hiba az adatok küldésekor:', err);
      setError("Hiba történt a felhasználó hozzáadása közben.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Biztosan törölni szeretnéd a(z) ${id} ID-jű felhasználót?`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      fetchData();
    } catch (err) {
      console.error("Hiba a törléskor:", err);
      setError("Nem sikerült törölni a felhasználót.");
    }
  };

  const handleEditStart = (user) => {
    setEditingId(user.id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };

  const handleUpdate = async (id) => {
    if (!editedName || !editedEmail) {
      alert("A név és az email mező kitöltése kötelező!");
      return;
    }
    try {
      await axios.patch(`http://localhost:3001/api/users/${id}`, {
        name: editedName,
        email: editedEmail,
      });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Hiba a módosításkor:", err);
      setError("Nem sikerült módosítani a felhasználót.");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  if (loading) {
    return <div className="App"><p>Adatok betöltése...</p></div>;
  }

  if (error) {
    return <div className="App"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="App">
      <h1>Felhasználókezelő (Full-Stack CRUD)</h1>
      <Menu
        users={users}
        name={name}
        email={email}
        editingId={editingId}
        editedName={editedName}
        editedEmail={editedEmail}
        setName={setName}
        setEmail={setEmail}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleEditStart={handleEditStart}
        handleUpdate={handleUpdate}
        handleEditCancel={handleEditCancel}
      />
    </div>
  );
}

export default App;
