const randomFood = document.getElementById("random-food");
const apiImage = document.getElementById("api-image");
const apiMealName = document.getElementById("api-foodName");
const searchButton = document.getElementById("search-button");

// Fetch a random meal on page load
fetchRandomMeal();

// Event listener for the search button
searchButton.addEventListener("click", function () {
  const input = document.querySelector(".search-box").value;
  if (input !== "") {
    fetchMealByName(input);
  } else {
    // If the search term is empty, fetch a random meal
    // fetchRandomMeal();
  }
});

// Function to fetch a random meal
function fetchRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      displayRandomMeal(meal);
      displayMealDetails(meal)
    })
    .catch((error) => {
      console.error("Error fetching random meal:", error);
      randomFood.innerHTML = "<p>Error fetching random meal</p>";
    });
}

// Function to display a random meal
function displayRandomMeal(meal) {
  apiImage.innerHTML = `<img id='randomMealImg' src="${meal.strMealThumb}" alt="${meal.strMeal}">`;
  apiMealName.textContent = meal.strMeal;
}

// Function to fetch meal details by name
function fetchMealByName(name) {
  const userInput = document.querySelector(".search-box").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;
      if (meals) {
        document.getElementById(
          "user-input"
        ).innerHTML = `Results for ${userInput}`;
        displayAllMeals(meals);
      } else {
        // If no meals are found, do something or display a message
        document.getElementById("meal-container").innerHTML =
          "<p>No meals found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching meal details by name:", error);
      document.getElementById("meal-container").innerHTML =
        "<p>Error fetching meal details</p>";
    });
}

// Function to display all meals
function displayAllMeals(meals) {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = ""; // Clear previous content

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    mealDiv.innerHTML = `
            <img id="inputMealImg"src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strMeal}</p>
        `;
    mealContainer.append(mealDiv);
  });
}

// Function to display meal details
function displayMealDetails(meal) {
  const ingredients = document.getElementById("ingredients");
  const videoContainer = document.getElementById("video-container");

  // Display ingredients
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      items.push(`${ingredient} - ${measure}`);
    }
  }
  const ingredientsText = items.join("<br>");
  ingredients.innerHTML = `<br>${ingredientsText}`;

  // Display video
  videoContainer.innerHTML = `<iframe id='vid' width="560" height="315" src="${meal.strYoutube.replace(
    "watch?v=",
    "embed/"
  )}" frameborder="0" allowfullscreen></iframe>`;;
}


