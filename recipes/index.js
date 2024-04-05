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

    cardCopy.querySelector(".ingredients_list").innerHTML = recipe.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");

    cardCopy.querySelector("[data-type=serves]").textContent =
      "Antal: " + recipe.serves + " pers.";

    cardCopy.querySelector(".allergen_list_and_diet").innerHTML +=
      recipe.allergens
        .map((allergen) => `<p class="recipe_tag">${allergen}</p>`)
        .join("");

    cardCopy.querySelector(
      ".allergen_list_and_diet"
    ).innerHTML += `<p class="recipe_tag">${recipe.diet}</p>`;

    if (recipe.studentFriendly) {
      cardCopy.querySelector(
        ".allergen_list_and_diet"
      ).innerHTML += `<p class="recipe_tag">SU-venlig</p>`;
    }

    cardCopy.querySelector("[data-type=origin]").textContent =
      "Oprindelse: " + recipe.origin;

    // Vi skal også bruge en slet og en update knap
    const deleteBtn = cardCopy.querySelector("button[data-action=delete]");
    deleteBtn.dataset.id = recipe.id;
    const updateBtn = cardCopy.querySelector("button[data-action=update]");
    updateBtn.dataset.id = recipe.id;

    // Jeg vidste ikke helt hvad jeg skulle vælge at opdatere, så det blev en simpel like knap, så kan man
    // også altid sætte en filtrering på de opskrifter man kan lide
    updateBtn.textContent = recipe.isLiked ? "♥" : "♡";

    deleteBtn.addEventListener("click", async (e) => {
      console.log(recipe.id, "er slettet");
      await deleteRecipe(recipe.id);
      showRecipes();
    });

    updateBtn.addEventListener("click", async (e) => {
      console.log(recipe.id, "opdateres");
      await patchRecipe(recipe.id, !recipe.isLiked);
      showRecipes();
    });

    // Her beder vi vores copy om at ligge sig i section for opskrifter
    document.querySelector(".recipes").appendChild(cardCopy);
  });
}

showRecipes();

// Den ny data fra vores form skal ind i vores data liste

const form = document.querySelector("form");

// Ved at preventdefault så laver browseren ikke en refresh, der vil slette dataen fra vores
// form, før den er blevet lageret i vores database
form.addEventListener("submit", async (e) => {
  console.log("submitted");
  e.preventDefault();
  const formData = new FormData(form);

  // Med radio button og checkboxs kan man ikke nødvendigvis bare sende data videre,
  // men vi kan læse værdig på dem der er blevet valgt og sende den værdi ned i vores objcet
  // især hvis vi har med flere værdier at gøre (checkbox)
  let forStudents = false;
  if (formData.get("studentfriendly") == "yes") {
    forStudents = true;
  }

  const checkboxes = document.querySelectorAll(
    'input[name="allergens"]:checked'
  );
  const selectedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

  // Det her er vores object, eller nye opskrift, den opsamler alt det nye data,
  // sender det videre til vores function post i recipedb.js
  const newRecipeData = {
    name: formData.get("name"),
    description: formData.get("description"),
    ingredients: formData.get("ingrediens").split("\n"),
    serves: formData.get("serves"),
    allergens: selectedValues,
    diet: formData.get("diet"),
    studentFriendly: forStudents,
    origin: formData.get("origin"),
    isLiked: false,
  };
  console.log("nyelig tilføjet opskrift", newRecipeData);
  await postRecipe(newRecipeData);

  // Fordi vores type="submit" ikke længere er default, så ryder den ikke vores input felter
  // derfor har jeg lige smidt en reset på vores form.
  document.querySelector("form").reset();
  showRecipes();
});
