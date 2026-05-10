import React, { useState } from 'react';
import proyectoService from '../services/proyectoService';

const ListaProyectos = () => {
    // estado Inicial
    const [proyectos, setProyectos] = useState(proyectoService.obtenerProyectos());
    const [busqueda, setBusqueda] = useState('');

    // acciones que puede hacer el usuario
    const handleEliminar = (id) => {
        proyectoService.eliminarProyecto(id);
        setProyectos(proyectoService.obtenerProyectos());
    };

    const handleBuscar = (e) => {
        const texto = e.target.value;
        setBusqueda(texto);
        const resultados = proyectoService.buscarProyecto(texto);
        setProyectos(resultados);
    };

    return (
        <main className="projects-main">
            <section className="welcome-section">
                <h1 style={{ borderBottom: '2px solid var(--primary-color)', display: 'inline-block' }}>
                    Explorador de Proyectos
                </h1>
                <p>Lista de proyectos educativos gestionada con React</p>
            </section>

            {/* buscador en tiempo real */}
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input"
                    placeholder="🔍 Buscar proyecto por título..."
                    value={busqueda}
                    onChange={handleBuscar}
                />
            </div>

            {/* renderizado con .map() */}
            <div className="projects-grid">
                {proyectos.length > 0 ? (
                    proyectos.map((proyecto) => (
                        <article key={proyecto.id} className="project-card">
                            <img src={proyecto.imagen} alt={proyecto.titulo} />
                            <div className="card-content">
                                <span className={`badge ${proyecto.estado === 'Finalizado' ? 'finished' : 'in-progress'}`}>
                                    {proyecto.estado}
                                </span>
                                <span className="category-tag">{proyecto.categoria}</span>
                                <h2>{proyecto.titulo}</h2>
                                <p>{proyecto.descripcion}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                    <button className="btn-secondary">Detalle</button>
                                    <button 
                                        className="btn-danger"
                                        onClick={() => handleEliminar(proyecto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No se encontraron proyectos para "{busqueda}"</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ListaProyectos;
