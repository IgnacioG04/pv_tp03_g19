const ProyectoCard = ({ proyecto, onEliminar, onVerDetalle }) => {
    const { id, titulo, categoria, estado, imagen } = proyecto;

    return (
        <article className="project-card">
            <img src={imagen} alt={titulo} />
            <div className="card-content">
                <span className={`badge ${estado === 'Finalizado' ? 'finished' : 'in-progress'}`}>
                    {estado}
                </span>
                <span className="category-tag">{categoria}</span>
                <h2>{titulo}</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => onVerDetalle(proyecto)}
                    >
                        Detalle
                    </button>
                    <button
                        className="btn-danger"
                        onClick={() => onEliminar(id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProyectoCard;
