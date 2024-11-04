export function Card(meal) {
    let { idMeal, strMeal, strMealThumb } = meal;
    let urlPoster = strMealThumb ?? "../assets/favicon.svg";

    return `
        <article class="card">
            <img src="${urlPoster}" alt="${strMeal}">
            <h2>${strMeal}</h2>
            <a href="#/receta/${idMeal}" class="post-card-link" data-id="${idMeal}">Ver más</a>
        </article>
    `;

}



