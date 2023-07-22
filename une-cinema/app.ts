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
        this.element.addEventListener('click', this.handleClick.bind(this))

    }

    handleClick () {
        if (this.status === STATUS.OCCUPIED) return 
        this.element.classList.remove(this.status.toLowerCase())
        this.status = this.status === STATUS.AVAILABLE ? STATUS.SELECTED : STATUS.AVAILABLE
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

    constructor(id:number, seatNumber: number) {
        this.id = id
        this.seats = Array.from({length: seatNumber }).map((_, index) => {
            const seatID = id * seatNumber + index + 1
            return new Seat(seatID)
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

    constructor( rowNumber: number, seatNumberPerRow: number) {
        this.rows = Array.from({length: rowNumber}).map((_, index) => {
            return new Row(index, seatNumberPerRow)
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



const seatMap = new SeatMap (8,8)
document.getElementById('theatre')?.appendChild(seatMap.element)


