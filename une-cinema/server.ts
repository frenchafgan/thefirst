import express, { Express, Request, Response } from 'express'
import cors from 'cors' 


const app: Express = express()

app.use(cors());

const movies = [
    {
        id: 1,
        title: 'Jurassic World Dominion',
        poster:
            'https://cdn.eventcinemas.com.au/cdn/resources/movies/15020/images/largeposter.jpg',
        theatre: {
            rowNumber: 8,
            seatNumberPerRow: 8,
            occupiedSeats: [2, 6, 12, 3],

        },
    },
    {
        id: 2,
        title: 'Top Gun: Maverick',
        poster:
            'https://cdn.eventcinemas.com.au/cdn/resources/movies/14621/images/largeposter.jpg',
        theatre: {
            rowNumber: 10,
            seatNumberPerRow: 12,
            occupiedSeats: [3, 4, 13, 14],
        },
    },
    {
        id: 3,
        title: 'Doctor Strange in the Multiverse of Madness',
        poster:
            'https://cdn.eventcinemas.com.au/cdn/resources/movies/15657/images/largeposter.jpg',
        theatre: {
            rowNumber: 9,
            seatNumberPerRow: 13,
            occupiedSeats: [15, 16, 22, 3, 5],
        },
    },
];

app.get('/movies', (req: Request, res: Response) => {
    res.send(movies);
});

app.listen(5000, () => {
    console.log('[server]: Server is running at http://localhost:5000/movies');
})


