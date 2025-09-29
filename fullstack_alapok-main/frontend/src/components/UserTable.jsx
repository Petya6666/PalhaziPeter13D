import React from 'react';
import UserRow from './UserRow';

function UserTable({
  users, editingId, editedName, editedEmail,
  handleEditStart, handleDelete, handleUpdate, handleEditCancel,
  setEditedName, setEditedEmail
}) {
  const tableHeaderStyle = { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f0f0f0' };
  const tableCellStyle = { border: '1px solid #ccc', padding: '10px', textAlign: 'left' };
  const noUsersCellStyle = { border: '1px solid #ccc', padding: '10px', textAlign: 'center' };
  const saveButtonStyle = { padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' };
  const cancelButtonStyle = { padding: '5px', backgroundColor: '#9E9E9E', color: 'white', border: 'none', cursor: 'pointer' };
  const editButtonStyle = { padding: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' };
  const deleteButtonStyle = { padding: '5px', backgroundColor: '#F44336', color: 'white', border: 'none', cursor: 'pointer' };

  return (
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
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
          users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              editingId={editingId}
              editedName={editedName}
              editedEmail={editedEmail}
              handleEditStart={handleEditStart}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleEditCancel={handleEditCancel}
              setEditedName={setEditedName}
              setEditedEmail={setEditedEmail}
              tableCellStyle={tableCellStyle}
              saveButtonStyle={saveButtonStyle}
              cancelButtonStyle={cancelButtonStyle}
              editButtonStyle={editButtonStyle}
              deleteButtonStyle={deleteButtonStyle}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={noUsersCellStyle}>Nincsenek felhasználók az adatbázisban.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
