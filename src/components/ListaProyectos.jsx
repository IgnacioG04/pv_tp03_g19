import { useState } from 'react';
import proyectoService from '../services/proyectoService';
import ProyectoCard from './ProyectoCard';
import DetalleProyecto from './DetalleProyecto';

const ListaProyectos = () => {
    // estado inicial
    const [proyectos, setProyectos] = useState(proyectoService.obtenerProyectos());
    const [busqueda, setBusqueda] = useState('');
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

    // estado del formulario de nuevo proyecto
    const [nuevoProyecto, setNuevoProyecto] = useState({
        titulo: '',
        categoria: 'Programación',
        estado: 'En Curso',
        descripcion: '',
        descripcionExtendida: '',
        recursos: { pdf: '', drive: '', github: '' },
        equipo: []
    });

    // estado auxiliar para agregar miembros uno a uno
    const [nuevoMiembro, setNuevoMiembro] = useState({ nombre: '', rol: '' });

    // desestructuración del estado del formulario
    const { titulo, categoria, estado, descripcion, descripcionExtendida, recursos, equipo } = nuevoProyecto;
    const { pdf, drive, github } = recursos;
    const { nombre: nombreMiembro, rol: rolMiembro } = nuevoMiembro;

    // acciones
    const handleEliminar = (id) => {
        proyectoService.eliminarProyecto(id);
        const restantes = busqueda
            ? proyectoService.buscarProyecto(busqueda)
            : proyectoService.obtenerProyectos();
        setProyectos(restantes);
    };

    const handleBuscar = (e) => {
        const texto = e.target.value;
        setBusqueda(texto);
        setProyectos(proyectoService.buscarProyecto(texto));
    };

    const handleVerDetalle = (proyecto) => {
        setProyectoSeleccionado(proyecto);
    };

    const handleVolver = () => {
        setProyectoSeleccionado(null);
    };

    const handleAgregarMiembro = () => {
        if (!nombreMiembro.trim() || !rolMiembro.trim()) return;
        setNuevoProyecto({
            ...nuevoProyecto,
            equipo: [...equipo, { nombre: nombreMiembro.trim(), rol: rolMiembro.trim() }]
        });
        setNuevoMiembro({ nombre: '', rol: '' });
    };

    const handleQuitarMiembro = (indice) => {
        setNuevoProyecto({
            ...nuevoProyecto,
            equipo: equipo.filter((_, i) => i !== indice)
        });
    };

    const handleAgregar = (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;

        proyectoService.agregarProyecto({
            titulo,
            categoria,
            estado,
            descripcion: descripcion || "Nuevo proyecto educativo en desarrollo.",
            descripcionExtendida: descripcionExtendida || "",
            recursos: { pdf, drive, github },
            equipo
        });

        // refrescar lista respetando la búsqueda activa si la hay
        const refrescados = busqueda
            ? proyectoService.buscarProyecto(busqueda)
            : proyectoService.obtenerProyectos();
        setProyectos(refrescados);

        // reset
        setNuevoProyecto({
            titulo: '',
            categoria: 'Programación',
            estado: 'En Curso',
            descripcion: '',
            descripcionExtendida: '',
            recursos: { pdf: '', drive: '', github: '' },
            equipo: []
        });
        setNuevoMiembro({ nombre: '', rol: '' });
    };

    // render condicional: si hay proyecto seleccionado, mostrar detalle
    if (proyectoSeleccionado) {
        return <DetalleProyecto proyecto={proyectoSeleccionado} onVolver={handleVolver} />;
    }

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
                            value={titulo}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Categoría</label>
                        <select
                            value={categoria}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, categoria: e.target.value })}
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
                            value={estado}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, estado: e.target.value })}
                        >
                            <option>En Curso</option>
                            <option>Finalizado</option>
                        </select>
                    </div>

                    <div className="form-field form-field-wide">
                        <label>Descripción breve</label>
                        <input
                            type="text"
                            placeholder="Resumen corto del proyecto"
                            value={descripcion}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
                        />
                    </div>

                    <div className="form-field form-field-wide">
                        <label>Descripción extendida (separe párrafos con una línea en blanco)</label>
                        <textarea
                            rows={4}
                            placeholder={"Primer párrafo de la descripción extendida.\n\nSegundo párrafo con más detalles."}
                            value={descripcionExtendida}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcionExtendida: e.target.value })}
                        />
                    </div>

                    <div className="form-field">
                        <label>URL del PDF</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={pdf}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, recursos: { ...recursos, pdf: e.target.value } })}
                        />
                    </div>
                    <div className="form-field">
                        <label>URL de Drive</label>
                        <input
                            type="url"
                            placeholder="https://drive.google.com/..."
                            value={drive}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, recursos: { ...recursos, drive: e.target.value } })}
                        />
                    </div>
                    <div className="form-field">
                        <label>URL de GitHub</label>
                        <input
                            type="url"
                            placeholder="https://github.com/..."
                            value={github}
                            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, recursos: { ...recursos, github: e.target.value } })}
                        />
                    </div>

                    <div className="form-field form-field-wide">
                        <label>Equipo</label>
                        {equipo.length > 0 && (
                            <ul className="equipo-list">
                                {equipo.map(({ nombre, rol }, indice) => (
                                    <li key={indice}>
                                        <span><strong>{nombre}</strong> — {rol}</span>
                                        <button
                                            type="button"
                                            className="btn-quitar-miembro"
                                            onClick={() => handleQuitarMiembro(indice)}
                                            aria-label={`Quitar a ${nombre}`}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="agregar-miembro-row">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombreMiembro}
                                onChange={(e) => setNuevoMiembro({ ...nuevoMiembro, nombre: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Rol"
                                value={rolMiembro}
                                onChange={(e) => setNuevoMiembro({ ...nuevoMiembro, rol: e.target.value })}
                            />
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={handleAgregarMiembro}
                            >
                                + Agregar miembro
                            </button>
                        </div>
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

            {/* renderizado con .map() delegando en ProyectoCard */}
            <div className="projects-grid">
                {proyectos.length > 0 ? (
                    proyectos.map((proyecto) => (
                        <ProyectoCard
                            key={proyecto.id}
                            proyecto={proyecto}
                            onEliminar={handleEliminar}
                            onVerDetalle={handleVerDetalle}
                        />
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
