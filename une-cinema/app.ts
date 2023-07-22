enum STATUS {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    SELECTED = "selected",
}

class Seat {
    id: number
    status: STATUS
    element: HTMLDivElement

    constructor(id: number, isOccupied: boolean = false) {
        this.id = id
        this.status = isOccupied ? STATUS.OCCUPIED : STATUS.AVAILABLE
        this.element = document.createElement('div')
        this.element.classList.add('seat')
        this.element.classList.add(this.status.toLowerCase())
        this.element.addEventListener('click', () => {
            this.handleClick()
        }
        )
    }

    handleClick () {
        if (this.status === STATUS.OCCUPIED) return 
        this.element.classList.remove(this.status.toLowerCase())
        this.status = 
            this.status === STATUS.AVAILABLE ? STATUS.SELECTED : STATUS.AVAILABLE
        this.element.classList.add(this.status.toLowerCase())

    }
    
    get isSelected() {
        return this.status === STATUS.SELECTED
    }
        
        
}

class Row {
    id: number 
    seats: Seat[]
    element: HTMLDivElement

    constructor(id:number, seatNumber: number, occupiedSeats: number[] = []) {
        this.id = id
        this.seats = Array.from({length: seatNumber }).map((_, index) => {
            const seatID = (id * seatNumber) + index
            return new Seat(seatID, occupiedSeats.includes(seatID))
        })
        this.element = document.createElement('div')
        this.element.classList.add('row')
        this.element.append(...this.seats.map(seat => seat.element))
    
    }

    get selectedSeatsID() {
        return this.seats.filter(seat => seat.isSelected).map(seat => seat.id)
    }

}

class SeatMap {
    rows: Row[]
    selectedSeats: number[] = []
    element: HTMLDivElement

    constructor( 
        rowNumber: number,
        seatNumberPerRow: number,
        occupiedSeats: number[] = []
        ) {
            this.rows = Array.from({length: rowNumber}).map((_, index) => {
                return new Row(index, seatNumberPerRow, occupiedSeats)
        })
        this.element = document.createElement('div')
        this.element.classList.add('seat-map')
        this.element.append(...this.rows.map(row => row.element))
        this.element.addEventListener('click', () => {
            this.getSelectedSeatsID()
        })
        }

    getSelectedSeatsID() {
        // this.selectedSeats = this.rows.reduce<number[]>((total, row) => {
        //     total = [...total, ...row.selectedSeatsID]
        //     return total
        // }, [])
        this.selectedSeats = this.rows.map(row => row.selectedSeatsID).flat()
        console.log(`selected seats: ${this.selectedSeats.join(',\n')}`)
    }
    
}


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


async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const headers = response.headers
    const data = headers.get('Content-Type')?.includes('application/json')
        ? await response.json()
        : {}
    return data
}

 
// async function fetchMovies(): Promise<void>{
//     const movies = await http<Movie[]>('http://localhost:5000/movies')
//     console.log(movies)

// }



// class Cinema {
//     movies: Movie[] = []
//     seatMap: SeatMap | null = null
//     theatreContainer: HTMLDivElement
//     moviesContainer: HTMLDivElement
//     movieElements: HTMLDivElement [] = []

//     constructor(){
//         this.moviesContainer = document.createElement('div')
//         this.moviesContainer.id = 'movies'
//         this.moviesContainer.classList.add('movies')
//         this.theatreContainer = document.createElement('div')
//         this.theatreContainer.id = 'theatre'
//         this.theatreContainer.classList.add('theatre')
//         const screenElement = document.createElement('div')
//         screenElement.classList.add('screen')
//         screenElement.innerText = 'Screen'
//         this.theatreContainer.appendChild(screenElement)
//         document
//             .getElementById('cinema')
//             ?.append(this.moviesContainer, this.theatreContainer)

//     }

//     async fetchMovies() {
//         this.movies = await http<Movie[]>('http://localhost:5000/movies')
//         if(this.movies.length) {
//             this.renderMovies()
//             this.selectMovie(2)
//         }
//     }

//     renderMovies() {
//         this.movieElements = []
//         this.moviesContainer.innerHTML = ''
//         this.movies.forEach((movie, index) => {
//             const movieElement = document.createElement('div')
//             movieElement.id = movie.id.toString()
//             movieElement.classList.add('movie')
//             movieElement.addEventListener('click', () => {
//                 if (!movieElement.classList.contains('selected')) {
//                     this.selectMovie(index)
//                 }
//             })
//             const posterElement = document.createElement('img')
//             posterElement.classList.add('poster')
//             posterElement.src = movie.poster
//             const titleElement = document.createElement('div')
//             titleElement.classList.add('title')
//             titleElement.innerText = movie.title
//             this.movieElements.push(movieElement)
//             this.moviesContainer.appendChild(movieElement)

//         })
//     }

    type MovieElement = {
        element: HTMLDivElement,
        movie: Movie
    }

    class Cinema {
        movies: Movie[] = []
        seatMap: SeatMap | null = null
        theatreContainer: HTMLDivElement
        moviesContainer: HTMLDivElement
        movieElements: MovieElement[] = []

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
                this.selectMovie(this.movies[0])
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
                        this.selectMovie(movie)
                    }
                })
                const posterElement = document.createElement('img')
                posterElement.classList.add('poster')
                posterElement.src = movie.poster
                const titleElement = document.createElement('div')
                titleElement.classList.add('title')
                titleElement.innerText = movie.title
                movieElement.appendChild(posterElement)
                movieElement.appendChild(titleElement)
                this.movieElements.push({element: movieElement, movie})
                this.moviesContainer.appendChild(movieElement)

            })
        }

        selectMovie(selectedMovie: Movie) {
            this.movieElements.forEach(({element, movie}) => 
                selectedMovie.id === movie.id
                ? element.classList.add('selected')
                : element.classList.remove('selected')
            )
            if (selectedMovie.theatre) {
                const {
                    theatre: {rowNumber, seatNumberPerRow, occupiedSeats}, 
                } = selectedMovie
                if (this.seatMap) {
                    this.theatreContainer.lastChild?.remove()
                }
                this.seatMap = new SeatMap(rowNumber, seatNumberPerRow, occupiedSeats)
                this.theatreContainer.appendChild(this.seatMap.element)
            }
        }  
    }
// }


const cinema = new Cinema()
cinema.fetchMovies()


const seatMap = new SeatMap (8,8)
document.getElementById('theatre')?.appendChild(seatMap.element)


