import React from 'react';
import './css/styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ListaProyectos from './components/ListaProyectos';

function App() {
  return (
    <div className="general-layout">
      <Header />
      <ListaProyectos />
      <Footer />
    </div>
  );
}

export default App;
