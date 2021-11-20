///////API/////////////

const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4ff3cfff3f84aa4a9939cee388ea7e32&language=en-US'
const IMG_URL = 'https://image.tmdb.org/t/p/w400'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4ff3cfff3f84aa4a9939cee388ea7e32&language=en-US&include_adult=false'


//////genres//////////////

const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]



////////Selectors///////////////////

const main = document.querySelector('.main')
const form = document.querySelector('.form')
const search = document.querySelector('.search')
const body = document.querySelector('body')
const container = document.querySelector('.movie-container')
const genreContainer = document.querySelector('.genre-container')
const showGenres = document.querySelector('.show-genres')

////fetch movie details from API////////////////////

const getMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.results.length !== 0){
            showMovies(data.results)
        }
        else{
            container.innerHTML = `<h1>No Results Found</h1>`
        }
        console.log(data)
})
}

getMovies(url)

/////////set genres ////////////

let activeGenre = []

const hightlightActiveGenre = () => {
    const genre = document.querySelectorAll('.genre')
    genre.forEach(id => {
        id.classList.remove('active')
    })
    createClearBtn()
    if(activeGenre){
        activeGenre.forEach((id) => {
            const selectedGenre = document.getElementById(id)
            selectedGenre.classList.add('active')
        })
    }
    
}

const setGenres = () => {
    genreContainer.innerHTML = ''
    genres.forEach((genre) => {
        const t = document.createElement('div')
        t.classList.add('genre')
        t.id = genre.id
        t.innerText = genre.name
        t.addEventListener('click', () => {
            if(activeGenre.includes(genre.id)){
                activeGenre.forEach((id, index) => {
                    if(id === genre.id){
                        activeGenre.splice(index,1)
                    }
                })
            } 
            else{
                activeGenre.push(genre.id)
            }
            console.log(activeGenre)
            getMovies(url + '&with_genres=' + encodeURI(activeGenre.join(',')))
            hightlightActiveGenre()
        })
        genreContainer.appendChild(t)
    })
}    


setGenres()

////Add clear button in genres /////

const createClearBtn = () => {
    const clear = document.querySelector('#clear')
    if(!clear){
        const clearBtn = document.createElement('div')
        clearBtn.classList.add('genre','clear') 
        clearBtn.id = 'clear'
        clearBtn.innerText = 'Clear All'
        clearBtn.addEventListener('click', () => {
            activeGenre = []
            setGenres()
            getMovies(url)
        })
        genreContainer.appendChild(clearBtn)
    }
    else return null
}


showGenres.addEventListener('click', () => {
    genreContainer.style.display = 'flex'
})

////////Map movie into HTML/////////////////

const showMovies = (data) => {
    container.innerHTML = ''

    data.forEach((movie) => {
        const { poster_path, title , vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie-card')
        movieElement.innerHTML = `
        <div class="movie-card">
            <img src="${poster_path ?IMG_URL + poster_path : 'https://via.placeholder.com/500x500?text=Image+Not+Found'}" alt="${title}" class="moive--img">
            <div class="movie-details">
                <h3 class="movie--title">${title}</h3>
                <h4 class="movie--rating">Rating </h4>
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

        container.appendChild(movieElement)        
        
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

////////Search feature/////////////////////////

form.addEventListener('submit',(e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm){
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }else {
        getMovies(url)
    }
})

