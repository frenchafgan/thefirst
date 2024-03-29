import Row from './Row'


export default class SeatMap {
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
