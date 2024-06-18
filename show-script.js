const getShowDataFromJson = async () => {
  const res = await fetch("./assets/json/shows.json");

  const shows = await res.json();

  return shows;
};

const getShowEpisodeElement = (show_banner_url, i) => {
  const elem = document.createElement("div");
  elem.classList.add("show");

  elem.innerHTML = `<img
                        src=${show_banner_url}
                        alt="Show Banner"
                        class="show-banner"
                        id="show-banner"
                      />

                      <p class="show-banner-name">Episode ${i + 1}</p>`;

  return elem;
};

const setShowData = async () => {
  const show_id = window.location.href.split("=")[1];

  const shows = await getShowDataFromJson();

  const show = shows.filter((show) => show_id === show.show_id)[0];

  document.getElementById(
    "hero-bg-image"
  ).style.backgroundImage = `url(${show.show_banner_url})`;

  document.getElementById("show-type").innerText =
    show.show_type === "tv" ? "series" : "movie";
  document.getElementById("show-name").innerText = show.show_name;
  document.getElementById(
    "show-list-heading"
  ).innerText = `Episodes (${show.total_episodes})`;

  const listShows = document.getElementById("list-shows");
  listShows.innerHTML = "";

  for (let i = 0; i < show.total_episodes; i++) {
    listShows.appendChild(getShowEpisodeElement(show.show_banner_url, i));
  }
};

setShowData();

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
