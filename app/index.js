import api from "./helpers/api.js";
import { App } from "./App.js"; 

// Escucha el evento 'DOMContentLoaded', que se activa cuando el contenido HTML ha sido completamente cargado y analizado
document.addEventListener("DOMContentLoaded", App);
// Escucha el evento 'hashchange', que se activa cuando la parte de la URL después del símbolo '#' cambia
window.addEventListener("hashchange", () => {
  api.page = 1; // Reinicia la página de la API a 1 cada vez que cambia el hash de la URL
  App(); // Llama a la función App para actualizar la vista
});
  