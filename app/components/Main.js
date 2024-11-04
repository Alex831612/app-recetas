export function Main() {
    const $main = document.createElement("main");
    $main.id = "main";
    // Verifica si el hash de la URL no incluye '#/search'
    if (!location.hash.includes("#/search")) {
        // Si no incluye '#/search', añade la clase 'grid-fluid' al elemento <main>
        $main.classList.add("grid-fluid");
    }
  
    return $main;
}