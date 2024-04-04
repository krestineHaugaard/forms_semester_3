// Importere vores get, post, delete og patch functioner fra recipedb.js (CRUD)
// de ligger i en anden js fil fordi de håndtere data i databasen og vi har derfor ikke nødvendigvis
// brug for at rode med dem særlig tit, på den måde undgår vi også lange kompliceret js filer.
import {
  getRecipe,
  postRecipe,
  deleteRecipe,
  patchRecipe,
} from "./utils/recipedb.js";

async function showRecipes() {
  const recipes = await getRecipe();

  //   Har genbrugt disse to consol logs fra Jonas exempel, det rart at kunne se at ens data bliver hentet ned, men
  // også hvor meget data der ligger og hvad den data er, så kan man også nemmere se om delete virker.
  console.log(recipes);
  console.log(recipes.length, "opskrifter i databasen");

  //   Vi bruger lige den her selector til at fjerne alt indhold i den section der indeholder alle opskrifter, så
  // slipper vi får at de ligger sig doppelt hver gang der opdateres.
  document.querySelector(".recipes").innerHTML = "";

  //   Nu deler vi lige alt dataen op så hver enkelt opskrift for den data der passer til.
  recipes.forEach((recipe) => {
    const cardTemplate = document.querySelector("template").content;

    // Vi laver en copy af indholdet i vores template, som kan bruges til at lave nye cards.
    const cardCopy = cardTemplate.cloneNode(true);

    // Her tager vi fat i de forskellige data set fra vores html (specifikt i vores copy) og fortæller
    // hvilken data fra vores dataset der skal ligge hvor.
    cardCopy.querySelector(".recipe_card").id = recipe.id;
    cardCopy.querySelector("[data-type=name]").textContent = recipe.name;
    cardCopy.querySelector("[data-type=description]").textContent =
      recipe.description;
    cardCopy.querySelector(".ingredients_list").innerHTML += recipe.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");
    cardCopy.querySelector("[data-type=serves]").textContent =
      "For " + recipe.serves + " personer";
    // cardCopy.querySelector(".allergens_list").innerHTML +=
    //   recipe.allergens.map((allergen)=> `<li>${allergen}</li>`).join("");
    // cardCopy.querySelector("[data-type=diet]").textContent = recipe.diet;
    // cardCopy.querySelector("[data-type=student_friendly]").textContent =
    //   recipe.studentFrindly;
    // cardCopy.querySelector("[data-type=origin]").textContent = recipe.origin;

    // Her beder vi vores copy om at ligge sig i section for opskrifter
    document.querySelector(".recipes").appendChild(cardCopy);
  });
}

showRecipes();
