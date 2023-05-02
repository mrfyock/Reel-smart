const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c0264f4db6msh45003672ba1aaaap1f4931jsn7fa5d98f2ce0',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
	.then(response => response.json())
	.then((json) => {
        const list = json;
        displayBackground(list);        
    })
	.catch(err => console.error(err));


//create background posters for splash page


const displayBackground = (list) => {
    const backgroundContainer = document.getElementById('background-container');
    const backgroundPosters = list.filter(item => item.title).filter(item => item.image).map(item => {
        return `<div class="poster">
        <img src="${item.image}" alt="${item.title}" class="posterImage"/>
            <p class="posterTitle">${item.title}</p>
        </div>`
    })
    // console.log(backgroundPosters);
    backgroundContainer.innerHTML = backgroundPosters.join("");
}

window.onload = function() {
    displayBackground
}


