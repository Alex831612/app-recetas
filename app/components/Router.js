import api from "../helpers/api.js";
import { ajax } from "../helpers/ajax.js";
import { ContactForm } from "./ContactForm.js";
import { CategoryPage } from "./Category.js";
import { Card } from "./card.js";
import { RecipeDetail } from "./RecipeDetail.js";


// Función Router que gestiona la navegación y carga el contenido en función del hash de la URL
export async function Router() {
    const d = document,
        $main = d.getElementById("main");
    
    let { hash } = location; // Obtiene el hash actual de la URL
    $main.innerHTML = null; // Limpia el contenido del elemento principal
 

    // Verifica si el hash está vacío o es la página principal
    if (!hash || hash === "#/") {
        // Llama a la función ajax para cargar los posts de recetas
        await ajax({
            url: api.SEARCH,
            cbSuccess: (posts) => {
                let html = "";
                (posts.meals || []).forEach((post) => {
                    html += Card(post); // Genera una tarjeta para cada receta
                });
                $main.innerHTML = html; // Inserta el contenido en el elemento principal
            },
        });
    // Si el hash incluye '#/search' (búsqueda de recetas)
    } else if (hash.includes("#/search")) {
        const query = new URLSearchParams(location.hash.split("?")[1]).get("query"); // Obtiene el término de búsqueda

        if (query) {
            await ajax({
                url: `${api.SEARCH}${query}`, // URL para buscar recetas
                cbSuccess: (response) => {
                    const meals = response.meals;
                    let html = "";

                    if (meals) {
                        meals.forEach((meal) => {
                            html += Card(meal);  // Genera una tarjeta para cada resultado
                        });
                    } else {
                        html = `<p class="error">No se encontraron resultados para <mark>${query}</mark></p>`;
                    }

                    $main.innerHTML = html;
                },
            });
        }
    // Si el hash es '#/categorias'
    } else if (hash === "#/categorias") {
        // Llamada a la API para obtener todas las categorías
        await ajax({
            url: api.CATEGORIES,
            cbSuccess: (response) => {
                $main.innerHTML = CategoryPage(response.categories); // Genera el contenido de la página de categorías
            },
        });
    // Si el hash incluye '#/categoria/' seguido del nombre de una categoría
    } else if (hash.includes("#/categoria/")) {
        const categoryName = hash.split("/")[2]; // Obtiene el nombre de la categoría de la URL
        
        await ajax({
            url: `${api.FILTER}${categoryName}`, // URL para obtener recetas de una categoría específica
            cbSuccess: (response) => {
                let html = `<h2 class="category-title">Recetas de ${categoryName}</h2>`;
                response.meals.forEach((meal) => {
                    html += Card(meal);
                });
                $main.innerHTML = html;
            },
        });
    // Si el hash es '#/contacto'
    } else if (hash === "#/contacto") {
        $main.appendChild(ContactForm()); // Muestra el formulario de contacto en el elemento principal


    // Si el hash incluye '#/receta/' seguido del ID de una receta
    } else if (hash.includes("#/receta/")) {
        // Obtenemos el ID de la receta del hash
        const recipeId = hash.split("/")[2];
        await ajax({
            url: `${api.LOOKUP}${recipeId}`,
            cbSuccess: (response) => {
                // Revisa que response tenga la estructura correcta
                if (response.meals) {
                    const recipe = response.meals[0]; // Accede a la receta
                    $main.innerHTML = RecipeDetail(recipe);
                } else {
                    $main.innerHTML = "<p>Receta no encontrada</p>";
                }
            },
        });
    }

    // Oculta el cargador una vez que se ha cargado el contenido
    d.querySelector(".loader").style.display = "none";
}
