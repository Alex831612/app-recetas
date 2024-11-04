const NAME = "TheMealDB",
    DOMAIN = `https://www.themealdb.com`,
    SITE = `${DOMAIN}/api/json/v1/1`,
    SEARCH = `${SITE}/search.php?s=`,  // Para buscar recetas por nombre
    LOOKUP = `${SITE}/lookup.php?i=`,  // Para obtener una receta por ID
    CATEGORIES = `${SITE}/categories.php`, // Para obtener las categorías
    FILTER = `${SITE}/filter.php?c=`;  // Para filtrar recetas por categoría

export default {
    NAME,
    DOMAIN,
    SITE,
    SEARCH,
    LOOKUP,
    CATEGORIES,
    FILTER,
};