export function RecipeDetail(recipe) {
    const {
        strMeal,
        strMealThumb,
        strInstructions,
        strCategory,
        strArea,
    } = recipe;

    // Filtra los ingredientes y medidas
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push(
                `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`] || ""}`
            );
        }
    }

    return `
        <section class="recipe-detail">
            <img src="${strMealThumb}" alt="${strMeal}">
            <h2>${strMeal}</h2>
            <h3>Categoría: ${strCategory}</h3>
            <h3>Región: ${strArea}</h3>
            <h3 class="subtitle">Ingredientes:</h3>
            <ul>
                ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
            </ul>
            <h3 class="subtitle">Instrucciones:</h3>
            <p>${strInstructions}</p>
            <a href="#/" class="back-link">Volver</a>
        </section>
    `;
}

