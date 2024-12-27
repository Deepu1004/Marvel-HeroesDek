// API Configuration
const ts = "1735276040308";
const publicKey = "662865e715953027ace2d1639fb23230";
const hashVal = "f6b2f1afadc70e8b87890c10ffc6a826";

// DOM Elements
const input = document.getElementById("input-box");
const button = document.getElementById("submit-button");
const showContainer = document.getElementById("show-container");
const autocompleteList = document.getElementById("autocomplete-list");

// Debounce function for search
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Fetch data from Marvel API
const fetchMarvelData = async (query, type) => {
  try {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&${type}=${query}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Handle autocomplete
const handleAutocomplete = debounce(async (query) => {
  if (query.length < 2) {
    autocompleteList.innerHTML = "";
    return;
  }

  const results = await fetchMarvelData(query, "nameStartsWith");

  autocompleteList.innerHTML = "";

  if (results.length === 0) {
    autocompleteList.innerHTML = "<div>No matches found</div>";
    return;
  }

  results.forEach((result) => {
    const div = document.createElement("div");
    div.textContent = result.name;
    div.addEventListener("click", () => {
      input.value = result.name;
      autocompleteList.innerHTML = "";
      searchHero(result.name);
    });
    autocompleteList.appendChild(div);
  });
}, 300);

// Search hero function
const searchHero = async (query) => {
  showContainer.innerHTML = '<div class="loading"><h3>Searching...</h3></div>';

  const results = await fetchMarvelData(query, "name");

  showContainer.innerHTML = "";

  if (results.length === 0) {
    showContainer.innerHTML =
      "<div class='no-results'><h3>No hero found!!!</h3></div>";
    return;
  }

  results.forEach((character) => {
    const { name, description, thumbnail } = character;
    const imgSrc = `${thumbnail.path}.${thumbnail.extension}`;
    const desc = description || "No description available for this hero.";

    const card = document.createElement("div");
    card.className = "card-container";
    card.innerHTML = `
      <div class="container-character-image">
        <img src="${imgSrc}" alt="${name}" loading="lazy">
      </div>
      <h2 class="character-name">${name}</h2>
      <p class="character-description">${desc}</p>
    `;

    showContainer.appendChild(card);
  });
};

// Event Listeners
input.addEventListener("input", (e) => handleAutocomplete(e.target.value));
button.addEventListener("click", () => searchHero(input.value));
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchHero(input.value);
  }
});

// Initial search
window.addEventListener("load", () => {
  input.value = "Spider-Man (Peter Parker)";
  searchHero("Spider-Man (Peter Parker)");
});
