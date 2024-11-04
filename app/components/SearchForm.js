export function SearchForm() {
    const $form = document.createElement("form");
    $form.classList.add("search-form");

    $form.innerHTML = `
        <input type="search" name="search" placeholder="Buscar receta..." autocomplete="off">
        <button type="submit">Buscar</button>
    `;

    // Escucha el evento 'submit' del formulario
    $form.addEventListener("submit", (e) => {
        // Previene el comportamiento predeterminado del formulario (recarga de página)
        e.preventDefault();
        // Obtiene el valor de búsqueda, lo recorta y lo convierte a minúsculas
        const query = e.target.search.value.trim().toLowerCase();

         // Si hay una consulta de búsqueda no vacía
        if (query) {
            // Cambia el hash de la URL para reflejar la búsqueda realizada
            location.hash = `#/search?query=${query}`;
            e.target.reset(); // Limpia el campo de búsqueda
        }
    });

    return $form;
}
