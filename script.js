const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4ff3cfff3f84aa4a9939cee388ea7e32&language=en-US'
const IMG_URL = 'https://image.tmdb.org/t/p/w400'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4ff3cfff3f84aa4a9939cee388ea7e32&language=en-US&include_adult=false'

const main = document.querySelector('.main')
const form = document.querySelector('.form')
const search = document.querySelector('.search')


const getMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        showMovies(data.results)
})
}

getMovies(url)

const showMovies = (data) => {
    main.innerHTML = ''

    data.forEach((movie) => {
        const { poster_path, title , vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie-card')
        movieElement.innerHTML = `
        <div class="movie-card">
            <img src="${IMG_URL + poster_path}" alt="{title}" class="moive--img">
            <div class="movie-details">
                <h3 class="movie--title">${title}</h3>
                <span class="movie--rating ${showColor(vote_average)}">${vote_average}</span>
                <div class="overview">
                    <h3>Overview</h3>
                    <p>
                        ${overview}
                    </p>
                </div>
            </div>
        </div>
        `

        main.appendChild(movieElement)
    })
}

const showColor = (vote_average) => {
    if(vote_average >=8){
        return 'green'
    }else if(vote_average >=5 && vote_average <8){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm){
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }else {
        getMovies(url)
    }
})

