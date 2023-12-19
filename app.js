function randomMealData(){
    const randomMealImage = document.querySelector("#api-image")
    const randomMealName = document.querySelector("#api-foodName")
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((data)=>{
        return data.json()
    }).then((res)=>{
        console.log(res)
        randomMealImage.innerHTML += `<img src="${res.meals[0].strMealThumb}" alt="mealImage" id="randomMealImg">`
        randomMealName.innerHTML += res.meals[0].strMeal
    }).catch((err)=>{
        console.log("error",err)
    })
}

randomMealData()

function fetchData(){
    const inputMeal = document.querySelector(".search-box").value
    const enteredMeal = document.querySelector("#input-meal")
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then((data) =>{

    })
}