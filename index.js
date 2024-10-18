const searchDrink = document.getElementById("input");

function fetchDrink(query = "a") {
    let URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
    
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            const drinks = data.drinks;
            if (drinks) {
                showDrink(drinks);
                document.getElementById("noDrink").style.display = "none";
            } else {
                document.querySelector(".drink-wrapper").innerHTML = "";
                document.getElementById("noDrink").style.display = "block";
            }
        })
        .catch((error) => console.error('Error fetching drinks:', error));
}

function showDrink(drinks) {
    const drinkWrapper = document.querySelector(".drink-wrapper");
    drinkWrapper.innerHTML = ""; // Clear previous drinks

    drinks.slice(0, 12).forEach(drink => {
        drinkWrapper.innerHTML += `
        <div class="drink-box   shadow-md	bg-slate-600  rounded		">
            <img src="${drink.strDrinkThumb}" alt="${drink.strGlass}">
            <div class="p-5">
                <h3 class="heading pb-3 text-white">${drink.strDrink}</h3>
                <p class=" pb-5 text-gray-300">${drink.strInstructions.slice(0, 50)}...</p>
                <p class="italic pb-3 text-white">${drink.strAlcoholic}</p>
               

                 <div class="my-4 ">
   <button class="px- text-yellow-300 " onclick="lookUpDetails('${drink.idDrink}')">Ingredients</button>
 </div>
            </div>
        </div>`;
    });
}

function searchHandler() {
    const query = searchDrink.value;
    if (query) {
        fetchDrink(query);
    } else {
        alert("Please enter a cocktail name.");
    }
}

// Event listener for search button
document.getElementById("search").addEventListener("click", searchHandler);

document.addEventListener("DOMContentLoaded", () => {
    fetchDrink();
});



function lookUpDetails(id){
   console.log("Look up",id)
   let URL =`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
   .then((res) => res.json())
   .then((drinks) => showDrinkDetails(drinks.drinks[0]));
 
 }
 function showDrinkDetails (drink){
   const details = document.getElementById("details")
   details.classList.add("visible")
   details.classList.remove("invisible")
 
   details.innerHTML =`
       <div class="popup bg-white w-[70%] min-h-[500px] p-10">
    <h2 class="text-2xl font-bold mb-4">${drink.strDrink}</h2>
    <p class="mb-6 ">${drink.strInstructions}</p>
    <button onclick="closeDeatils()">
   Close
    </button>
     </div>
   `;
 }
 
 function closeDeatils() {
   details.classList.add("invisible");
   details.classList.remove("visible");
 }
  
  const search = document.getElementById("search");
  search.addEventListener("click",() => {
     fetchDrink();
  });
 
  fetchDrink()
 
 