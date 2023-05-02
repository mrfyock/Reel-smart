// API Resources
//last minute decision to cut the shows from this iteration of the project until endpoint can be found to include both movies and shows

const apiSource = 'https://api.themoviedb.org/3/'
const apiKey = '630d172b3d0a58e288a71a94fcf7e7b4'
const upcomingMovie = 'movie/upcoming?'
const nowPlaying = 'movie/now_playing?'
const topRatedMovie = 'movie/top_rated?'
const topRatedTV = 'tv/top_rated?'
const trending = 'trending/all/day?'
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key='




const upcomingMovieBtn = document.querySelector('#upcomingMovieBtn');
const nowPlayingBtn = document.querySelector('#nowPlayingBtn');
const topMovieBtn = document.querySelector('#topMovieBtn');
const topTvBtn = document.querySelector('#topTvBtn');
const trendBtn = document.querySelector('#trendBtn');
const h3 = document.querySelector('#h3');
let selectionText = "";
const form = document.querySelector('form')
const search = document.querySelector('#searchBar');


//Fetch API //
async function getData(api) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log(data);
      const entertainment = data.results;
      cardInfoFunction(entertainment);
    } catch (error) {
      console.log(error);
    }
  }
  // On click fetch data from API based on selection
  upcomingMovieBtn.addEventListener('click', () => {
    selectionText = upcomingMovieBtn.textContent;
    h3.innerHTML = selectionText;
    getData(apiSource + upcomingMovie + 'api_key=' + apiKey);
  });
  
  nowPlayingBtn.addEventListener('click', () => {
    selectionText = nowPlayingBtn.textContent;
    h3.innerHTML = selectionText;
    getData(apiSource + nowPlaying + 'api_key=' + apiKey);
  });
  
  topMovieBtn.addEventListener('click', () => {
    selectionText = topMovieBtn.textContent;
    h3.innerHTML = selectionText;
    getData(apiSource + topRatedMovie + 'api_key=' + apiKey);
  });
  
  topTvBtn.addEventListener('click', () => {
    selectionText = topTvBtn.textContent;
    h3.innerHTML = "Coming soon. Please try another selection";
    // getData(apiSource + topRatedTV + 'api_key=' + apiKey);
  });
  
  trendBtn.addEventListener('click', () => {
    selectionText = trendBtn.textContent;
    h3.innerHTML = selectionText;
    getData(apiSource + trending + 'api_key=' + apiKey);
  });

// search for movies and tv shows

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = search.value;

    if (searchText){
        getData(searchURL + apiKey + '&language=en-US&query=' + searchText)
    } else {
        alert("Please try search again")
    }
    h3.innerHTML = "Results for: " + searchText;
})



// card creation and filter incomplete results/
const cardInfoFunction = (entertainment) => {
    const selectionContainer = document.querySelector('.card-container');
    const selectionCards = entertainment.filter(item => item.title || item.name).filter(item => item.poster_path).map(item => {
        const title = item.title || item.name;
        return `          
            <div class ="card">
            <a href="details.html?id=${item.id}"><img src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="${item.title}" class="cardImage"></a>
            <p class="cardTitle">${title}</p>
            </div>`
    })
    selectionContainer.innerHTML = selectionCards.join("");
}



function callAction() {
  const container = document.querySelector('.card-container');
  const div = document.createElement('div');
  div.innerHTML = '<div class="action"><h1>Please Make a Selection</h1></div>';
  container.appendChild(div);
}

window.onload = callAction;