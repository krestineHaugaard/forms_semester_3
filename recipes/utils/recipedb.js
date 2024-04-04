const myApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aXNvZ2p3dm50Zm94dWRvb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTE5NDUsImV4cCI6MjAyNjMyNzk0NX0.A4lJrT15zWBvm6Zm7nXbtq01CUOrjNct49-JgtQboeg";

// GET

export async function getRecipe() {
  let headersList = {
    Accept: "application/json",
    apikey: myApiKey,
  };

  let response = await fetch(
    "https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes",
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
}

// POST

export async function postRecipe(data) {
  let headersList = {
    apikey: myApiKey,
    Accept: "application/json",
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify(data);

  let response = await fetch(
    "https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let newRecipe = await response.json();
  return newRecipe;
}

// DELETE

export async function deleteRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: myApiKey,
    Prefer: "return=representation",
  };

  let response = await fetch(
    "https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes?id=eq." + id,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
}

// // PATCH

export async function patchRecipe(id) {
  let headersList = {
    apikey: myApiKey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    serves: 3,
  });

  let response = await fetch(
    "https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes?id=eq." + id,
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
}
