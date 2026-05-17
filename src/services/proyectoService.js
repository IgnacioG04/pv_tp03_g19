const proyectoService = (() => {
    let proyectos = [
        {
            id: 1,
            titulo: "Portal de Alumnos",
            categoria: "Programación",
            estado: "En Curso",
            descripcion: "Desarrollo de una plataforma para que los alumnos revisen sus asistencias y notas.",
            descripcionExtendida: "El Portal de Alumnos es una aplicación web pensada para centralizar la información académica de cada estudiante: historial de asistencias, calificaciones por materia, calendario de evaluaciones y mensajes institucionales. La interfaz prioriza la rapidez de consulta y el acceso desde dispositivos móviles.",
            imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
            recursos: {
                pdf: "https://example.com/portal-alumnos/informe.pdf",
                drive: "https://drive.google.com/drive/folders/portal-alumnos",
                github: "https://github.com/grupo19/portal-alumnos"
            },
            equipo: [
                { nombre: "Ignacio Gutiérrez", rol: "Desarrollador Full Stack" },
                { nombre: "Lucía Fernández", rol: "Diseñadora UX/UI" },
                { nombre: "Martín Pereyra", rol: "Backend Developer" }
            ]
        },
        {
            id: 2,
            titulo: "Investigación Cuántica",
            categoria: "Ciencias",
            estado: "Finalizado",
            descripcion: "Análisis de las teorías fundamentales de la física cuántica aplicada a la computación.",
            descripcionExtendida: "Este proyecto de investigación abordó los principios de la mecánica cuántica con foco en su aplicación a la computación: superposición, entrelazamiento y el modelo de qubits. Se realizó una revisión bibliográfica exhaustiva y se desarrollaron simulaciones simples utilizando Qiskit.\n\nComo cierre, el equipo presentó un paper interno con conclusiones sobre las limitaciones actuales del hardware cuántico y las oportunidades educativas que ofrece la simulación clásica de algoritmos cuánticos como Grover y Shor en contextos académicos.",
            imagen: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=400&q=80",
            recursos: {
                pdf: "https://example.com/cuantica/paper.pdf",
                drive: "https://drive.google.com/drive/folders/cuantica",
                github: "https://github.com/grupo19/investigacion-cuantica"
            },
            equipo: [
                { nombre: "Carolina Ruiz", rol: "Investigadora Principal" },
                { nombre: "Diego Sosa", rol: "Físico Teórico" }
            ]
        },
        {
            id: 3,
            titulo: "Mural Institucional",
            categoria: "Arte",
            estado: "En Curso",
            descripcion: "Diseño y pintura colaborativa de un mural representativo en la pared principal.",
            descripcionExtendida: "El Mural Institucional es una obra colectiva que busca representar la identidad y los valores de la comunidad educativa. La pieza, de 12 metros de largo, integra técnicas mixtas: acrílico, esténcil y collage con materiales reciclados aportados por los propios estudiantes.\n\nEl proceso creativo se desarrolló en talleres abiertos donde se votaron los símbolos a incluir. El proyecto cuenta con el acompañamiento del departamento de Arte y se espera inaugurar la obra en el cierre del ciclo lectivo.",
            imagen: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=80",
            recursos: {
                pdf: "https://example.com/mural/propuesta.pdf",
                drive: "https://drive.google.com/drive/folders/mural",
                github: ""
            },
            equipo: [
                { nombre: "Valentina López", rol: "Coordinadora artística" },
                { nombre: "Tomás Aguirre", rol: "Ilustrador" },
                { nombre: "Sofía Méndez", rol: "Voluntaria comunitaria" }
            ]
        },
        {
            id: 4,
            titulo: "Brazo Mecánico",
            categoria: "Robótica",
            estado: "En Curso",
            descripcion: "Construcción de un brazo robótico controlado por Arduino para laboratorios.",
            descripcionExtendida: "El Brazo Mecánico es un prototipo de cinco grados de libertad construido con piezas impresas en 3D, servomotores SG90 y un microcontrolador Arduino Uno. Su objetivo es funcionar como herramienta didáctica en clases de electrónica y programación de bajo nivel.\n\nEl software de control combina firmware en C++ sobre Arduino con una interfaz en Python para enviar trayectorias. Próximamente se incorporará reconocimiento por visión artificial usando OpenCV para que el brazo identifique y manipule objetos por color.",
            imagen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
            recursos: {
                pdf: "https://example.com/brazo/manual.pdf",
                drive: "https://drive.google.com/drive/folders/brazo-mecanico",
                github: "https://github.com/grupo19/brazo-mecanico"
            },
            equipo: [
                { nombre: "Javier Romero", rol: "Líder de hardware" },
                { nombre: "Florencia Cabrera", rol: "Desarrolladora firmware" }
            ]
        },
        {
            id: 5,
            titulo: "Simulador de Mercado",
            categoria: "Negocios",
            estado: "Finalizado",
            descripcion: "Aplicación orientada a simular inversiones en la bolsa para Microeconomía.",
            descripcionExtendida: "El Simulador de Mercado es una aplicación educativa que permite a los estudiantes operar con un portafolio virtual y cotizaciones reales obtenidas de una API pública. Cada participante comienza con un capital simulado y debe sostener una estrategia durante el cuatrimestre.\n\nEl proyecto incluyó talleres semanales de análisis fundamental y técnico. El cierre del simulador derivó en un informe comparando las estrategias más rentables y un ranking que se entregó a la cátedra de Microeconomía como insumo de evaluación.",
            imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
            recursos: {
                pdf: "https://example.com/simulador/informe-final.pdf",
                drive: "https://drive.google.com/drive/folders/simulador-mercado",
                github: "https://github.com/grupo19/simulador-mercado"
            },
            equipo: [
                { nombre: "Mateo Ibarra", rol: "Product Owner" },
                { nombre: "Camila Torres", rol: "Analista financiera" },
                { nombre: "Bruno Salas", rol: "Desarrollador Frontend" }
            ]
        }
    ];

    const obtenerProyectos = () => [...proyectos];

    const agregarProyecto = (proyecto) => {
        const nuevoProyecto = {
            ...proyecto,
            id: proyectos.length > 0 ? Math.max(...proyectos.map(p => p.id)) + 1 : 1,
            imagen: proyecto.imagen || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
            descripcionExtendida: proyecto.descripcionExtendida || "Descripción extendida pendiente.\n\nEste proyecto aún no cuenta con detalles ampliados cargados por el equipo.",
            recursos: proyecto.recursos || { pdf: "", drive: "", github: "" },
            equipo: proyecto.equipo || []
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
