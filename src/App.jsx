import React from 'react';
import './css/styles.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="general-layout">
      <Header />
      <main className="projects-main">
        <section className="welcome-section">
          <h1>Gestión de Proyectos Educativos</h1>
          <p>Migración en proceso</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
