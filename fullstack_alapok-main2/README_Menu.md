# 📘 Menu.jsx – Rövid útmutató

## 🧠 Mi ez?
A Menu.jsx egy React komponens, amely egy egyszerű menüt hoz létre. Segítségével a felhasználó választhat:
- 👥 Felhasználók listája (UserTable)
- ➕ Új felhasználó hozzáadása (UserForm)

## ⚙️ Hogyan működik?
A Menu.jsx egy `activeTab` nevű állapotváltozót használ:


const [activeTab, setActiveTab] = useState('list');