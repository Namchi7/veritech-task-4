const getShowDataFromJson = async () => {
  const res = await fetch("./assets/json/shows.json");

  const shows = await res.json();

  return shows;
};

const getShowElement = (show) => {
  const elem = document.createElement("a");
  elem.classList.add("show");
  elem.href = `/show.html?show_id=${show.show_id}`;

  elem.innerHTML = `<img
                src=${show.show_banner_url}
                alt="Show Banner"
                class="show-banner"
              />`;

  return elem;
};

const renderListShows = async () => {
  const shows = await getShowDataFromJson();

  const listShowsPopularDiv = document.getElementById("list-shows-popular");
  const listShowsTrendingMovieDiv = document.getElementById(
    "list-shows-trending-movie"
  );
  const listShowsTrendingTVDiv = document.getElementById(
    "list-shows-trending-tv"
  );
  const listShowsRecommendedDiv = document.getElementById(
    "list-shows-recommended"
  );

  listShowsPopularDiv.innerHTML = "";
  listShowsTrendingMovieDiv.innerHTML = "";
  listShowsTrendingTVDiv.innerHTML = "";
  listShowsRecommendedDiv.innerHTML = "";

  shows.forEach((show) => {
    if (show.on_list === "popular") {
      listShowsPopularDiv.appendChild(getShowElement(show));
    }
    if (show.on_list === "recommended") {
      listShowsRecommendedDiv.appendChild(getShowElement(show));
    }
    if (show.on_list === "trending" && show.show_type === "movie") {
      listShowsTrendingMovieDiv.appendChild(getShowElement(show));
    }
    if (show.on_list === "trending" && show.show_type === "tv") {
      listShowsTrendingTVDiv.appendChild(getShowElement(show));
    }
  });
};

renderListShows();

const renderSearchResult = (shows) => {
  const searchResults = document.getElementById("search-result");
  searchResults.innerHTML = "";

  if (shows.length === 0) {
    const elem = document.createElement("a");
    elem.classList.add("search-item");
    elem.innerText = "No results found";

    searchResults.appendChild(elem);
  }

  shows.forEach((show) => {
    const elem = document.createElement("a");
    elem.classList.add("search-item");
    elem.innerText = show.show_name;
    elem.href = `/show.html?show_id=${show.show_id}`;

    searchResults.appendChild(elem);
  });

  searchResults.style.display = "flex";
};

const searchShow = async () => {
  const searchInput = document.getElementById("search-input").value;

  const shows = await getShowDataFromJson();

  const filtered = shows.filter((show) => show.show_name.includes(searchInput));

  renderSearchResult(filtered);
};

const searchIcon = document.getElementById("search-icon");
searchIcon.addEventListener("click", searchShow);
