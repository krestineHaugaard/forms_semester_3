// // GET
// let headersList = {
//     "Accept": "application/json",
//     "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aXNvZ2p3dm50Zm94dWRvb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTE5NDUsImV4cCI6MjAyNjMyNzk0NX0.A4lJrT15zWBvm6Zm7nXbtq01CUOrjNct49-JgtQboeg"
//    }

//    let response = await fetch("https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes", {
//      method: "GET",
//      headers: headersList
//    });

//    let data = await response.text();
//    console.log(data);

// // POST
// let headersList = {
//     "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aXNvZ2p3dm50Zm94dWRvb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTE5NDUsImV4cCI6MjAyNjMyNzk0NX0.A4lJrT15zWBvm6Zm7nXbtq01CUOrjNct49-JgtQboeg",
//     "Prefer": "return=representation",
//     "Content-Type": "application/json"
//    }

//    let bodyContent = JSON.stringify({
//      "name": "Stegt flæsk m. persillesovs",
//        "description": "Som man kender den",
//        "ingredients": [
//          "stege flæsk",
//          "mælk",
//          "salt",
//          "peber",
//          "mel",
//          "kartofler",
//          "muskat nød",
//          "fløde",
//          "persille"
//        ],
//        "serves": 4,
//        "allergens": null,
//        "diet": "omni",
//        "studentFriendly": false,
//        "origin": "Danmark"
//    });

//    let response = await fetch("https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes", {
//      method: "POST",
//      body: bodyContent,
//      headers: headersList
//    });

//    let data = await response.text();
//    console.log(data);

// // DELETE
// let headersList = {
//     "Accept": "application/json",
//     "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aXNvZ2p3dm50Zm94dWRvb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTE5NDUsImV4cCI6MjAyNjMyNzk0NX0.A4lJrT15zWBvm6Zm7nXbtq01CUOrjNct49-JgtQboeg",
//     "Prefer": "return=representation"
//    }

//    let response = await fetch("https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes?id=eq.2", {
//      method: "DELETE",
//      headers: headersList
//    });

//    let data = await response.text();
//    console.log(data);

// // PATCH

// let headersList = {
//     "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1aXNvZ2p3dm50Zm94dWRvb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTE5NDUsImV4cCI6MjAyNjMyNzk0NX0.A4lJrT15zWBvm6Zm7nXbtq01CUOrjNct49-JgtQboeg",
//     "Prefer": "return=representation",
//     "Content-Type": "application/json"
//    }

//    let bodyContent = JSON.stringify({
//      "serves": 3
//    });

//    let response = await fetch("https://yuisogjwvntfoxudooln.supabase.co/rest/v1/recipes?id=eq.3", {
//      method: "PATCH",
//      body: bodyContent,
//      headers: headersList
//    });

//    let data = await response.text();
//    console.log(data);
