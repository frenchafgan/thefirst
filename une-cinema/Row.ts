import Seat from "./Seat"; 

export default class Row {
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
