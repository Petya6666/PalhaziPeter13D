import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './copmonents/Menu.jsx';
import FoOldal from './copmonents/FoOldal.jsx';
import Leiras from './copmonents/Leiras.jsx';
import Regisztracio from './copmonents/Regisztracio.jsx';



function Alkalmazas() {
  return (
    <div>
      <Menu />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<FoOldal />} />
          <Route path="/leiras" element={<Leiras />} />
          <Route path="/regisztracio" element={<Regisztracio />} />
        </Routes>
      </main>
    </div>
  );
}

// --- Alkalmazás Renderelése ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Alkalmazas />
    </BrowserRouter>
  </React.StrictMode>
);

export default Alkalmazas;
