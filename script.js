let recipes = {
    pizza: {
        title: 'Pizza',
        image: "pizza.jpg",
        servings: 2,
        ingredients: ['Flour', 'Water', 'Yeast', 'Salt', 'Sugar', 'Tomato Sauce', 'Cheese', 'Pepperoni', 'Olives'],
        instructions: 'Mix flour, water, yeast, salt, and sugar to make the dough. Let it rise for 1 hour. Roll out the dough, spread tomato sauce, add cheese, pepperoni, and olives. Bake at 200°C for 15 minutes.'
    },
    pancakes: {
        title: 'Pancakes',
        image: "pancakes.png",
        servings: 4,
        ingredients: ['Flour', 'Milk', 'Eggs', 'Sugar', 'Salt', 'Butter'],
        instructions: 'Mix flour, milk, eggs, sugar, and salt to make the batter. Heat a pan, add butter, pour the batter, cook until golden brown on both sides.'
    },
    pasta: {
        title: 'Pasta',
        image: "pasta.jpg",
        servings: 2,
        ingredients: ['Flour', 'Water', 'Salt', 'Tomato Sauce', 'Cheese', 'Meatballs'],
        instructions: 'Boil water, add salt and pasta, cook for 10 minutes. Drain the pasta, add tomato sauce, cheese, and meatballs.'
    },
    sandwich: {
        title: 'Sandwich',
        image: "sandwich.jpg",
        servings: 1,
        ingredients: ['Bread', 'Cheese', 'Ham', 'Lettuce', 'Tomato'],
        instructions: 'Take 2 slices of bread, add cheese, ham, lettuce, and tomato. Cover with another slice of bread.'
    },
    salad: {
        title: 'Salad',
        image: "salad.jpg", 
        servings: 1,
        ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olives', 'Feta Cheese', 'Olive Oil', 'Vinegar'],
        instructions: 'Chop lettuce, tomato, and cucumber. Add olives and feta cheese. Dress with olive oil and vinegar.'
    },
    omlette: {
        title: 'Omlette',
        image: "omlette.jpg",
        servings: 1,
        ingredients: ['Eggs', 'Milk', 'Salt', 'Pepper', 'Cheese', 'Ham', 'Mushrooms', 'Onions'],
        instructions: 'Beat eggs with milk, salt, and pepper. Pour into a hot pan, add cheese, ham, mushrooms, and onions. Cook until set.'
    },
    aloo_paratha: {
        title: 'Aloo Paratha',
        image: "aloo_paratha.jpg",
        servings: 2,
        ingredients: ['Flour', 'Water', 'Salt', 'Potato', 'Onion', 'Green Chilli', 'Coriander'],
        instructions: 'Mix flour, water, and salt to make the dough. Boil and mash potato, add chopped onion, green chilli, and coriander. Stuff the potato mixture in dough, roll out, and cook on a hot griddle.'
    },
    french_fries: {
        title: 'French Fries',
        image: "french_fries.jpg",
        servings: 2,
        ingredients: ['Potato', 'Salt', 'Oil'],
        instructions: 'Peel and cut potatoes into strips. Soak in cold water for 30 minutes. Drain and pat dry. Fry in hot oil until golden brown. Sprinkle salt.'
    },
    smoothie: {
        title: 'Smoothie',
        image: "smoothies.png",
        servings: 1,
        ingredients: ['Banana', 'Milk', 'Honey', 'Almonds', 'Dates'],
        instructions: 'Blend banana, milk, honey, almonds, and dates until smooth.'
    },
    burger: {
        title: 'Burger',
        image: "burger.png",  
        servings: 1,
        ingredients: ['Bun', 'Patty', 'Cheese', 'Lettuce', 'Tomato', 'Onion', 'Mayonnaise'],
        instructions: 'Toast the bun, add patty, cheese, lettuce, tomato, onion, and mayonnaise. Cover with another bun.'
    },
    idli_dosa: {
        title: 'Idli Dosa',
        image: "idli_dosa.png",  
        servings: 2,
        ingredients: ['Rice', 'Urad Dal', 'Salt'],
        instructions: 'Soak rice and urad dal for 4 hours. Grind into a smooth batter. Ferment overnight. Make idli or dosa on a hot griddle.'
    },
    french_toast: {
        title: 'French Toast',
        image: "french_toast.png",  
        servings: 2,
        ingredients: ['Bread', 'Eggs', 'Milk', 'Sugar', 'Salt'],
        instructions: 'Beat eggs with milk, sugar, and salt. Dip bread slices in the mixture. Fry until golden brown on both sides.'
    }
};


function handleRecipeClick(event) {
    if (event.target.tagName === "H3") {
        
        let clickedRecipe = event.target.innerText.toLowerCase();
        
        let recipeArray = Object.values(recipes);

        let foundRecipes = recipeArray.filter(function(recipe) {
            return recipe.title.toLowerCase().includes(clickedRecipe);
        });

        if (foundRecipes.length > 0) {
            displayRecipes(foundRecipes, false);
        } 
        else {
            fetchOnlineRecipe(clickedRecipe);
        }
    }
}

// Attach the click event listener to the whole document
document.addEventListener("click", handleRecipeClick);

document.querySelector(".searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById("searchRecipe").value.toLowerCase();

    // Convert recipes object to an array for filtering
    const recipeArray = Object.values(recipes);

    // Filter recipes from local data
    const filteredRecipes = recipeArray.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery)
    );

    if (filteredRecipes.length > 0) {
        displayRecipes(filteredRecipes, false);
    } else {
        fetchOnlineRecipe(searchQuery);
    }
});
document.querySelector(".searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById("searchRecipe").value.toLowerCase();

    // Convert recipes object to an array for filtering
    const recipeArray = Object.values(recipes);

    // Filter recipes from local data
    const filteredRecipes = recipeArray.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery)
    );

    if (filteredRecipes.length > 0) {
        displayRecipes(filteredRecipes, false);
    } else {
        fetchOnlineRecipe(searchQuery);
    }
});

// Function to fetch online recipe if not found locally
function fetchOnlineRecipe(searchQuery) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                displayRecipes(data.meals, true);
            } else {
                document.querySelector(".recipe-grid").innerHTML = "<p>No recipes found!</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayRecipes(recipeList, isAPI) {
    const recipeGrid = document.querySelector(".recipe-grid");
    recipeGrid.innerHTML = ""; // Clear previous results

    recipeList.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <img src="${isAPI ? recipe.strMealThumb : recipe.image}" alt="${isAPI ? recipe.strMeal : recipe.title}">
                <h3>${isAPI ? recipe.strMeal : recipe.title}</h3>
                <p><strong>Servings:</strong> ${isAPI ? "Unknown" : recipe.servings}</p>
                <h4>Ingredients:</h4>
                <ul>
                    ${getIngredients(recipe, isAPI)}
                </ul>
                <h4>Instructions:</h4>
                <p>${isAPI ? recipe.strInstructions : recipe.instructions}</p>
            </div>
        `;
        recipeGrid.innerHTML += recipeCard;
    });
}

// Function to get ingredients
function getIngredients(recipe, isAPI) {
    if (!isAPI) {
        return recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");
    } else {
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = recipe[`strIngredient${i}`];
            let measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }
        return ingredients;
    }
}
document.querySelector(".recipe-grid").addEventListener("click", function (e) {
    if (e.target.tagName === "IMG" || e.target.tagName === "H3") {
        const recipeTitle = e.target.tagName === "IMG" ? e.target.nextElementSibling.textContent : e.target.textContent;
        const recipe = getRecipeDetails(recipeTitle);
        displayModal(recipe);
    }
})