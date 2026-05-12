const DetalleProyecto = ({ proyecto, onVolver }) => {
    const {
        titulo,
        categoria,
        estado,
        imagen,
        descripcionExtendida = '',
        recursos: { pdf, drive, github } = {},
        equipo = []
    } = proyecto;

    const parrafos = descripcionExtendida.split('\n\n').filter(p => p.trim() !== '');

    return (
        <main className="detail-main">
            <button
                className="btn-secondary"
                onClick={onVolver}
                style={{ marginBottom: '1.5rem' }}
            >
                ← Volver a la lista
            </button>

            <article className="project-detail">
                {imagen && (
                    <img
                        src={imagen}
                        alt={titulo}
                        style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem' }}
                    />
                )}

                <h1>{titulo}</h1>
                <div className="detail-meta">
                    <span className={`badge ${estado === 'Finalizado' ? 'finished' : 'in-progress'}`}>
                        {estado}
                    </span>
                    <span className="category-tag">{categoria}</span>
                </div>

                <section className="detail-description">
                    <h2>Descripción</h2>
                    {parrafos.length > 0 ? (
                        parrafos.map((parrafo, indice) => (
                            <p key={indice}>{parrafo}</p>
                        ))
                    ) : (
                        <p>Sin descripción extendida.</p>
                    )}
                </section>

                <section className="detail-resources">
                    <h2>Recursos</h2>
                    <ul className="resources-list">
                        {pdf && (
                            <li>
                                <a href={pdf} target="_blank" rel="noopener noreferrer">
                                    Documento PDF
                                </a>
                            </li>
                        )}
                        {drive && (
                            <li>
                                <a href={drive} target="_blank" rel="noopener noreferrer">
                                    Carpeta de Google Drive
                                </a>
                            </li>
                        )}
                        {github && (
                            <li>
                                <a href={github} target="_blank" rel="noopener noreferrer">
                                    Repositorio en GitHub
                                </a>
                            </li>
                        )}
                        {!pdf && !drive && !github && (
                            <li style={{ color: 'var(--text-secondary)' }}>
                                No se cargaron recursos para este proyecto.
                            </li>
                        )}
                    </ul>
                </section>

                <section className="detail-team">
                    <h2>Equipo</h2>
                    {equipo.length > 0 ? (
                        <ul className="resources-list">
                            {equipo.map(({ nombre, rol }, indice) => (
                                <li key={indice}>
                                    <strong>{nombre}</strong> — {rol}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Aún no se cargaron miembros del equipo.
                        </p>
                    )}
                </section>
            </article>
        </main>
    );
};

export default DetalleProyecto;
