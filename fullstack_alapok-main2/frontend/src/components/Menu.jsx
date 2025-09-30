import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

function Menu({
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
  handleEditCancel
}) {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="Menu">
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('list')} style={{ marginRight: '10px' }}>
          Felhasználók listája
        </button>
        <button onClick={() => setActiveTab('add')}>
          Új felhasználó hozzáadása
        </button>
      </nav>

      {activeTab === 'list' ? (
        <UserTable
          users={users}
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
      ) : (
        <UserForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Menu;
