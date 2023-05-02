let currentId;


console.log('Current ID:', currentId);
const urlParams = new URLSearchParams(window.location.search);
currentId = urlParams.get("id");
console.log(currentId);
 

// api shares ID numbers with TV shows and movies. only works on movies. if a tv show is selected it will either not work or it will show a movie with the same id #. Additional logic needed to handle TV shows.

// fetch(`https://api.themoviedb.org/3/search/multi?${}api_key=630d172b3d0a58e288a71a94fcf7e7b4&language=en-US&page=1&include_adult=false`)


fetch(`https://api.themoviedb.org/3/movie/${currentId}?api_key=630d172b3d0a58e288a71a94fcf7e7b4`)

.then((res) => res.json())
.then((json) => {
    const selection = json;
    console.log(selection);
    displaySelection(selection);
})
.catch((err) => console.error(err));






// display data. additional code needed to shorten dates and votes and other data//  
const displaySelection = (selection) => {
    const container = document.querySelector('.container');
    const fullDate = `${selection.release_date}`;
    const year = fullDate.substring(0, 4);
    const voteCount = `${selection.vote_count}`;
    let voteShort;
    if (voteCount >= 1000 && voteCount < 1000000) {
        voteShort = (voteCount / 1000).toFixed(1) + "k";
      } else if (voteCount >= 1000000) {
        voteShort = (voteCount / 1000000).toFixed(1) + "m";
      } else {
        voteShort = voteCount.toString();
      }
    const rating = `${selection.vote_average}`;
    let ratingShort = Number.parseFloat(rating).toFixed(1);
    const genreNames = [];
    for (let i = 0; i < selection.genres.length; i++) {
        const name = selection.genres[i].name;
        genreNames.push(name);
    }
    const genreString = genreNames.join(" "); 
    // const backgroundImage = `${selection.backdrop_path}`;
    const details = `
        <div class="description-container">
            <div class="title">
                <h1>${selection.title || selection.name}</h1>
                <p>${year}</p>
            </div>
            <div class="description">
                <p class="genre">Genres: ${genreString}</p>
                <p class="synopsis"> ${selection.overview} </p>
            </div>
            <div class="details">
                <p class="runtime">Runtime: ${selection.runtime} minutes</p> 
                <p class="rating"> ${ratingShort}/10</p>
                <p class="votes">${voteShort} votes</p>       
            </div>
      </div>
      <div class="image-container">
        <img class="poster" src="https://image.tmdb.org/t/p/original/${selection.poster_path}" alt="${selection.title || selection.name}">
      </div>`;
    container.innerHTML = details;
  }

