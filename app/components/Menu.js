export function Menu() {
    const $menu = document.createElement("nav");
    $menu.classList.add("menu");
    $menu.innerHTML = `
        <a href="#/" > Inicio </a>
        <span> - </span>
        <a href="#/categorias" > Categorias </a>
        <span> - </span>
        <a href="#/contacto" > Contacto </a>
    `;
    return $menu;
}