import SeatMap from "./SeatMap"
import http from "./http"


type Theatre = {
    rowNumber: number,
    seatNumberPerRow: number,
    occupiedSeats: number[]
}

type Movie = {
    id: number,
    title: string,
    poster: string,
    theatre: Theatre
}


 
// async function fetchMovies(): Promise<void>{
//     const movies = await http<Movie[]>('http://localhost:5000/movies')
//     console.log(movies)

// }



export default class Cinema {
    movies: Movie[] = []
    seatMap: SeatMap | null = null
    theatreContainer: HTMLDivElement
    moviesContainer: HTMLDivElement
    movieElements: HTMLDivElement [] = []

    constructor(){
        this.moviesContainer = document.createElement('div')
        this.moviesContainer.id = 'movies'
        this.moviesContainer.classList.add('movies')
        this.theatreContainer = document.createElement('div')
        this.theatreContainer.id = 'theatre'
        this.theatreContainer.classList.add('theatre')
        const screenElement = document.createElement('div')
        screenElement.classList.add('screen')
        screenElement.innerText = 'Screen'
        this.theatreContainer.appendChild(screenElement)
        document
            .getElementById('cinema')
            ?.append(this.moviesContainer, this.theatreContainer)

    }

    async fetchMovies() {
        this.movies = await http<Movie[]>('http://localhost:5000/movies')
        if(this.movies.length) {
            this.renderMovies()
            this.selectMovie(0)
        }
    }

    
    renderMovies() {
        this.movieElements = []
        this.moviesContainer.innerHTML = ''
        this.movies.forEach((movie, index) => {
            const movieElement = document.createElement('div')
            movieElement.id = movie.id.toString()
            movieElement.classList.add('movie')
            movieElement.addEventListener('click', () => {
                if (!movieElement.classList.contains('selected')) {
                    this.selectMovie(index)
                }
            })
            const posterElement = document.createElement('img')
            posterElement.classList.add('poster')
            posterElement.src = movie.poster

            const titleElement = document.createElement('div')
            titleElement.classList.add('title')
            titleElement.innerText = movie.title

            // append the poster and title elements to the movie element
            movieElement.appendChild(posterElement)
            movieElement.appendChild(titleElement)

            this.movieElements.push(movieElement)
            this.moviesContainer.appendChild(movieElement)
        })
    }
    



    selectMovie(selectedIndex: number) {
        this.movieElements.forEach((element, index) => 
            selectedIndex === index
            ? element.classList.add('selected')
            : element.classList.remove('selected')
        )            
        const {
            theatre: {rowNumber, seatNumberPerRow, occupiedSeats}, 
        } = this.movies[selectedIndex]
        if (this.seatMap) {
            this.theatreContainer.lastChild?.remove()
        }
        this.seatMap = new SeatMap(rowNumber, seatNumberPerRow, occupiedSeats)
        this.theatreContainer.appendChild(this.seatMap.element)
            
    }  
}

