import React, { useState } from 'react';
import proyectoService from '../services/proyectoService';

const ListaProyectos = () => {
    // estado Inicial
    const [proyectos, setProyectos] = useState(proyectoService.obtenerProyectos());
    const [busqueda, setBusqueda] = useState('');
    
    // estado para el formulario del nuevo proyecto
    const [nuevoProyecto, setNuevoProyecto] = useState({
        titulo: '',
        categoria: 'Programación',
        estado: 'En Curso',
        descripcion: ''
    });

    // 2. Acciones de Usuario
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

    const handleAgregar = (e) => {
        e.preventDefault();
        if (!nuevoProyecto.titulo.trim()) return;
        
        // llamada al servicio
        proyectoService.agregarProyecto({
            ...nuevoProyecto,
            descripcion: nuevoProyecto.descripcion || "Nuevo proyecto educativo en desarrollo."
        });
        
        // sincroniza su estado y resetea el form
        setProyectos(proyectoService.obtenerProyectos());
        setNuevoProyecto({ titulo: '', categoria: 'Programación', estado: 'En Curso', descripcion: '' });
    };

    return (
        <main className="projects-main">
            <section className="welcome-section">
                <h1 style={{ borderBottom: '2px solid var(--primary-color)', display: 'inline-block' }}>
                    Explorador de Proyectos
                </h1>
                <p>Lista de proyectos educativos gestionada con React</p>
            </section>

            {/* form para agregar un nuevo proyecto */}
            <section className="add-project-section">
                <form className="add-project-form" onSubmit={handleAgregar}>
                    <div className="form-field">
                        <label>Título</label>
                        <input 
                            type="text" 
                            placeholder="Nombre del proyecto"
                            value={nuevoProyecto.titulo}
                            onChange={(e) => setNuevoProyecto({...nuevoProyecto, titulo: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Categoría</label>
                        <select 
                            value={nuevoProyecto.categoria}
                            onChange={(e) => setNuevoProyecto({...nuevoProyecto, categoria: e.target.value})}
                        >
                            <option>Programación</option>
                            <option>Ciencias</option>
                            <option>Arte</option>
                            <option>Robótica</option>
                            <option>Negocios</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Estado</label>
                        <select 
                            value={nuevoProyecto.estado}
                            onChange={(e) => setNuevoProyecto({...nuevoProyecto, estado: e.target.value})}
                        >
                            <option>En Curso</option>
                            <option>Finalizado</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary">Añadir Proyecto</button>
                </form>
            </section>

            {/* buscador en tiempo real */}
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input"
                    placeholder="Buscar proyecto por título..."
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
