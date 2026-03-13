// fields you plan to display for your movie
// title, year, director, poster - must have at least these properties
export interface MovieDetails {
    Title: string;
    Year: string;
    Director: string;
    Poster: string;
    Response: string;
    Error: string;
}

// s=jaws >1 movies
export interface SearchResults {
    Search: MovieDetails[];
    totalResults?: string;
    Response: string;
    Error?: string;
}
