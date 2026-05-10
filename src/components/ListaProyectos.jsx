import React, { useState } from 'react';
import proyectoService from '../services/proyectoService';

const ListaProyectos = () => {
    // estado inicial
    const [proyectos] = useState(proyectoService.obtenerProyectos());

    return (
        <main className="projects-main">
            <section className="welcome-section">
                <h1 style={{ borderBottom: '2px solid var(--primary-color)', display: 'inline-block' }}>
                    Explorador de Proyectos
                </h1>
                <p>Lista de proyectos educativos gestionada con React</p>
            </section>

            {/* renderizado con .map() */}
            <div className="projects-grid">
                {proyectos.map((proyecto) => (
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
                                <button className="btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default ListaProyectos;
