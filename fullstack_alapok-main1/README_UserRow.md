# UserRow.jsx

Ez a komponens egyetlen felhasználói sort jelenít meg a táblázatban, normál vagy szerkesztési módban.

## Props:
- `user`: felhasználói objektum
- `editingId`: szerkesztés alatt álló ID
- `editedName`, `editedEmail`: szerkesztett értékek
- `handleEditStart`, `handleDelete`, `handleUpdate`, `handleEditCancel`: műveleti függvények
- `setEditedName`, `setEditedEmail`: szerkesztett értékek frissítése
