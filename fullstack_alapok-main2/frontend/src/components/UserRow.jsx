import React from 'react';

function UserRow({
  user, editingId, editedName, editedEmail,
  handleEditStart, handleDelete, handleUpdate, handleEditCancel,
  setEditedName, setEditedEmail,
  tableCellStyle, saveButtonStyle, cancelButtonStyle, editButtonStyle, deleteButtonStyle
}) {
  return (
    <tr key={user.id}>
      <td style={tableCellStyle}>{user.id}</td>
      {editingId === user.id ? (
        <>
          <td style={tableCellStyle}>
            <input
              type="text"
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
            />
          </td>
          <td style={tableCellStyle}>
            <input
              type="email"
              value={editedEmail}
              onChange={e => setEditedEmail(e.target.value)}
            />
          </td>
        </>
      ) : (
        <>
          <td style={tableCellStyle}>{user.name}</td>
          <td style={tableCellStyle}>{user.email}</td>
        </>
      )}
      <td style={tableCellStyle}>{new Date(user.created_at).toLocaleDateString()}</td>
      <td style={tableCellStyle}>
        {editingId === user.id ? (
          <>
            <button onClick={() => handleUpdate(user.id)} style={saveButtonStyle}>Mentés</button>
            <button onClick={handleEditCancel} style={cancelButtonStyle}>Mégse</button>
          </>
        ) : (
          <>
            <button onClick={() => handleEditStart(user)} style={editButtonStyle}>Szerkesztés</button>
            <button onClick={() => handleDelete(user.id)} style={deleteButtonStyle}>Törlés</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default UserRow;
