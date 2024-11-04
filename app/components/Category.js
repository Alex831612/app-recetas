export function CategoryPage(categories) {
    return `
        <section class="category-page">
            <h2>Todas las categorías de recetas</h2>
            <ul class="category-list">
                ${categories.map(category => `
                    <li class="category-item">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="category-image">
                        <h3>${category.strCategory}</h3>
                        <p>${category.strCategoryDescription}</p>
                        <a href="#/categoria/${category.strCategory}" class="category-link">
                            Ver recetas de ${category.strCategory}
                        </a>
                    </li>
                `).join("")}
            </ul>
        </section>
    `;
}
