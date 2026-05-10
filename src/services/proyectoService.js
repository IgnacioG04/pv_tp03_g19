const proyectoService = (() => {
    let proyectos = [
        { 
            id: 1, 
            titulo: "Portal de Alumnos", 
            categoria: "Programación", 
            estado: "En Curso",
            descripcion: "Desarrollo de una plataforma para que los alumnos revisen sus asistencias y notas.",
            imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: 2, 
            titulo: "Investigación Cuántica", 
            categoria: "Ciencias", 
            estado: "Finalizado",
            descripcion: "Análisis de las teorías fundamentales de la física cuántica aplicada a la computación.",
            imagen: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: 3, 
            titulo: "Mural Institucional", 
            categoria: "Arte", 
            estado: "En Curso",
            descripcion: "Diseño y pintura colaborativa de un mural representativo en la pared principal.",
            imagen: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: 4, 
            titulo: "Brazo Mecánico", 
            categoria: "Robótica", 
            estado: "En Curso",
            descripcion: "Construcción de un brazo robótico controlado por Arduino para laboratorios.",
            imagen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: 5, 
            titulo: "Simulador de Mercado", 
            categoria: "Negocios", 
            estado: "Finalizado",
            descripcion: "Aplicación orientada a simular inversiones en la bolsa para Microeconomía.",
            imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80"
        }
    ];

    const obtenerProyectos = () => [...proyectos];

    const agregarProyecto = (proyecto) => {
        const nuevoProyecto = {
            ...proyecto,
            id: proyectos.length > 0 ? Math.max(...proyectos.map(p => p.id)) + 1 : 1,
            imagen: proyecto.imagen || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
        };
        proyectos = [...proyectos, nuevoProyecto];
        return nuevoProyecto;
    };

    const eliminarProyecto = (id) => {
        proyectos = proyectos.filter(p => p.id !== id);
    };

    const buscarProyecto = (texto) => {
        const busqueda = texto.toLowerCase();
        return proyectos.filter(p => p.titulo.toLowerCase().includes(busqueda));
    };

    return {
        obtenerProyectos,
        agregarProyecto,
        eliminarProyecto,
        buscarProyecto
    };
})();

export default proyectoService;
