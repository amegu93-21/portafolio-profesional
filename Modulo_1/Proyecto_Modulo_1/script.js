document.addEventListener("DOMContentLoaded", () => {

    /* ==================== BOTON CONTACTAR ==================== */

    const contactButton = document.getElementById("contactButton");
    const feedback = document.getElementById("feedback");

    contactButton.addEventListener("click", () => {

        document
            .getElementById("contacto")
            .scrollIntoView({
                behavior: "smooth"
            });

        feedback.textContent = "Puedes contactarme mediante el formulario.";

        setTimeout(() => {
            feedback.textContent = "";
        }, 3000);
    });


    /* ==================== BOTON EXPLORAR ==================== */

    const exploreButton = document.getElementById("exploreButton");

    exploreButton.addEventListener("click", () => {

        document
            .getElementById("experiencia")
            .scrollIntoView({
                behavior: "smooth"
            });
    });


    /* ==================== CLOSURE ==================== */

    function crearRastreador() {

        let conteo = 0;

        return function () {
            conteo++;
            return conteo;
        };
    }

    const registrarVisita = crearRastreador();

    const visitCounter = document.getElementById("visitCounter");

    visitCounter.addEventListener("click", () => {

        const visitas = registrarVisita();

        visitCounter.textContent = `Visitas: ${visitas}`;
    });


    /* ==================== SKILLS + MAP ==================== */

    const skills = [
        {
            nombre: "Redes",
            descripcion: "Configuración y soporte de redes LAN y VLAN."
        },
        {
            nombre: "Infraestructura",
            descripcion: "Cableado estructurado, fibra óptica y telecomunicaciones."
        },
        {
            nombre: "Soporte",
            descripcion: "Diagnóstico y mantenimiento de equipos y redes."
        },
        {
            nombre: "Desarrollo Web",
            descripcion: "HTML, CSS y JavaScript en formación."
        }
    ];


    const skillsContainer =
        document.getElementById("skillsContainer");


    skillsContainer.innerHTML = skills
        .map(skill => `
            <article class="skill-card">
                <h3>${skill.nombre}</h3>
                <p>${skill.descripcion}</p>
            </article>
        `)
        .join("");


    /* ==================== EXPERIENCIA ==================== */

    const experienciaTecnica = [

        {
            titulo: "Configuración de redes LAN",
            categoria: "Redes",
            descripcion:
                "Configuración y soporte de redes LAN en diferentes entornos."
        },

        {
            titulo: "Implementación de VLAN",
            categoria: "Redes",
            descripcion:
                "Configuración y segmentación lógica mediante VLAN."
        },

        {
            titulo: "Cableado estructurado",
            categoria: "Infraestructura",
            descripcion:
                "Instalación y organización de infraestructura de cableado."
        },

        {
            titulo: "Fibra óptica",
            categoria: "Infraestructura",
            descripcion:
                "Conocimientos relacionados con planta externa y fibra óptica."
        },

        {
            titulo: "Mantenimiento de equipos",
            categoria: "Soporte",
            descripcion:
                "Mantenimiento preventivo y correctivo de equipos informáticos."
        },

        {
            titulo: "Diagnóstico de redes",
            categoria: "Soporte",
            descripcion:
                "Identificación de problemas de conectividad y funcionamiento."
        },

        {
            titulo: "HTML y CSS",
            categoria: "Desarrollo",
            descripcion:
                "Desarrollo de estructuras y estilos para páginas web."
        },

        {
            titulo: "JavaScript",
            categoria: "Desarrollo",
            descripcion:
                "Implementación de interactividad y manipulación del DOM."
        }

    ];


    const experienceContainer =
        document.getElementById("experienceContainer");

    const experienceMetric =
        document.getElementById("experienceMetric");

    const lastSelected =
        document.getElementById("lastSelected");

    const experienceDetail =
        document.getElementById("experienceDetail");


    function renderizarExperiencia(lista) {

        experienceContainer.innerHTML = lista
            .map(item => `
                <article
                    class="experience-card"
                    data-index="${experienciaTecnica.indexOf(item)}"
                >

                    <span>${item.categoria}</span>

                    <h3>${item.titulo}</h3>

                    <p>${item.descripcion}</p>

                </article>
            `)
            .join("");


        const total = lista.reduce(
            (acumulador) => acumulador + 1,
            0
        );

        experienceMetric.textContent =
            `${total} experiencia${total !== 1 ? "s" : ""}`;
    }


    renderizarExperiencia(experienciaTecnica);


    /* ==================== FILTER ==================== */

    const filterButtons =
        document.querySelectorAll(".filter-button");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const categoria =
                button.dataset.category;


            const filtradas =
                categoria === "Todos"
                    ? experienciaTecnica
                    : experienciaTecnica.filter(
                        item => item.categoria === categoria
                    );


            renderizarExperiencia(filtradas);

            lastSelected.textContent =
                `Categoría: ${categoria}`;

            localStorage.setItem(
                "ultimaCategoria",
                categoria
            );
        });

    });


    /* ==================== EVENT DELEGATION ==================== */

    experienceContainer.addEventListener("click", event => {

        const card =
            event.target.closest(".experience-card");

        if (!card) return;


        const index =
            Number(card.dataset.index);


        const experiencia =
            experienciaTecnica[index];


        experienceDetail.innerHTML = `
            <strong>${experiencia.titulo}</strong>
            <br>
            ${experiencia.descripcion}
        `;
    });


    /* ==================== LOCAL STORAGE ==================== */

    const ultimaCategoria =
        localStorage.getItem("ultimaCategoria");

    if (ultimaCategoria) {

        lastSelected.textContent =
            `Última categoría seleccionada: ${ultimaCategoria}`;
    }


    /* ==================== FORMULARIO ==================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    contactForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            formMessage.textContent =
                "Por favor, completa todos los campos.";

            return;
        }


        formMessage.textContent =
            `Gracias, ${name}. Tu mensaje fue registrado correctamente.`;

        contactForm.reset();
    });


    /* ==================== DIAGNOSTICO DE RED ==================== */

    const diagnosticButton =
        document.getElementById("diagnosticButton");

    const networkStatus =
        document.getElementById("networkStatus");

    const diagnosticResult =
        document.getElementById("diagnosticResult");


    diagnosticButton.addEventListener("click", () => {

        const status =
            networkStatus.value;


        if (status === "") {

            diagnosticResult.textContent =
                "Selecciona una opción para iniciar el diagnóstico.";

            return;
        }


        if (status === "si") {

            diagnosticResult.textContent =
                "¡Perfecto! Tu equipo tiene conectividad con el router.";

        } else {

            diagnosticResult.textContent =
                "Parece que hay un problema de conectividad LAN. Verifica el cableado, la interfaz de red y la configuración.";

        }

    });


    /* ==================== FETCH + ASYNC/AWAIT ==================== */

    async function obtenerDatoDemo() {

        try {

            const response =
                await fetch(
                    "https://jsonplaceholder.typicode.com/todos/1"
                );

            const data =
                await response.json();

            console.log(
                "Consulta de prueba:",
                data
            );

        } catch (error) {

            console.log(
                "No fue posible realizar la consulta.",
                error
            );
        }
    }


    obtenerDatoDemo();

});