const randomFood = document.getElementById("random-food");
const apiImage = document.getElementById("api-image");
const apiMealName = document.getElementById("api-foodName");
const searchButton = document.getElementById("search-button");
const inputBox = document.querySelector(".search-box")

// Fetches a random meal every time when the page loads
fetchRandomMeal();

// Event listener(click) for the search button
searchButton.addEventListener("click", function () {
  const input = document.querySelector(".search-box").value;
  if (input !== "") {
    fetchMealByName(input);
    document.getElementById("meal-details").scrollIntoView({behavior: "smooth"})
  }else{
    alert("Please search for a meal")
  }
});

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter"){
    document.getElementById("meal-details").scrollIntoView({behavior: "smooth"})
    const input = document.querySelector(".search-box").value;
    if (input !== "") {
      fetchMealByName(input);
    }else{
      alert("Please search for a meal")
    }
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
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;
      if (meals) {
        document.getElementById(
          "user-input"
        ).innerHTML = `Results for "${userInput}"`;
        displayAllMeals(meals);
      } else {
        document.getElementById("meal-container").innerHTML =
          "<p id='noMeal'>No meals found :(</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching meal details by name:", error);
      document.getElementById("meal-container").innerHTML =
        "<p>Please try refreshing the page :)</p>";
    });
}

// Function to display all meals
function displayAllMeals(meals) {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = ""; // Clears the previous texts

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    mealDiv.innerHTML = `
            <img id="inputMealImg"src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p id="inputMealName">${meal.strMeal}</p>
        `;
    mealContainer.append(mealDiv);
  });
  document.getElementById("full").scrollIntoView({behavior: "smooth"})

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
      items.push(`• ${ingredient} - ${measure}`);
    }
  }
  const ingredientsText = items.join("<br>");
  ingredients.innerHTML = `<br>${ingredientsText}`;

  videoContainer.innerHTML = `<iframe id='vid' width="560" height="315" src="${meal.strYoutube.replace(
    "watch?v=",
    "embed/"
  )}" frameborder="0" allowfullscreen></iframe>`;;
}

mealDetails =  document.getElementById("meal-details")
apiImage.onclick = () =>{
  // showLoader()
  mealDetails.style.visibility = "visible";
  document.getElementById("meal-details").scrollIntoView({behavior: "smooth"})
}

document.getElementById("close-logo").onclick = () =>{
  // showLoader()
  mealDetails.style.visibility = "hidden";
  document.getElementById("main-title").scrollIntoView({behavior: "smooth"})

}

document.addEventListener("DOMContentLoaded", function() {
  showLoader();
  setTimeout(function() {
    hideLoader(); 
  }, 1000);
});

function showLoader() {
  const loaderContainer = document.getElementById("loader-container");
  const mainContent = document.getElementById("body");
  setTimeout(function() {
    hideLoader();
  }, 1000)

  loaderContainer.style.display = "flex"; 
  mainContent.style.display = "none"; 

}

function hideLoader() {
  const loaderContainer = document.getElementById("loader-container");
  const mainContent = document.getElementById("body");

  loaderContainer.style.display = "none"; 
  mainContent.style.display = "block";
}

document.querySelector(".random").onclick = () =>{
  document.getElementById("random-title").scrollIntoView({behavior: "smooth"})
}

document.querySelector(".credits").onclick = () => {
  document.getElementById("credits").scrollIntoView({behavior: "smooth"})
}
