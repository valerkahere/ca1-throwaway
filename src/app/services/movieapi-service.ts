import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { MovieDetails, SearchResults } from '../models/moviedetails.interface';
import { Observable, catchError, tap, throwError, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieapiService {
    
    public movie = signal<MovieDetails | null>(null);

    // Signal movies will take an array of movie objects
    public movies = signal<MovieDetails[]>([]);

    public errorMessage = signal<any>(null);

    // o	Create signal that stores totalResults
    public totalResults = signal<number>(0);
    public currentPage = signal<number>(1);
    
    // o	Create signal that stores maxPages – this should be calculated from totalResults and results per page
    public maxPages = computed(() => {

        return Number(this.totalResults()) > 0 ? Math.ceil(Number(this.totalResults()) / 10) : 1;
    })

    // We must remember what the user searched for so nextPage() knows what to fetch
    public currentSearchTerm = signal<string>('');



    private _baseURL = "https://www.omdbapi.com/";
    private _API_KEY = "?apikey=e42e477d";

    // _http is built during object creation without initializing
    //  It automatically creates a class property named _http and assigns the injected instance to it, so you can use it later as this._http.
    constructor(private _http:HttpClient) {}

    private handleError(err:HttpErrorResponse) {
        this.errorMessage.set(err);
        console.log(`OmdbApiService ${err.message}`)
        return throwError(() => new Error(`OmdbApiService: ${err.message}`))
    }

    
    // the return value is observable of type MovieDetails
    getMovie(id: string) {
        const fullURL = `${this._baseURL}${this._API_KEY}&i=${id}`
        this._http.get<MovieDetails>(fullURL)
        .pipe( // pipe chain multiples operators together. Takes observable, returns transformte
            // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
            tap(data => console.log("Moviedata: " + JSON.stringify(data))
        ),
            catchError((err) => this.handleError(err))
        ) 
        .subscribe(data => {
            this.movie.set(data);
        })
        
    }

    getMovies(title: string, page: number = 1) {
        this.errorMessage.set(null);
        // Save the search term and current page in our state
        this.currentSearchTerm.set(title);
        this.currentPage.set(page);

        const fullURL = `${this._baseURL}${this._API_KEY}&s=${title}&page=${page}`;
        this._http.get<SearchResults>(fullURL)

        .subscribe({
                next: (data) => {
                    if (data.Response === "True") {
                        console.log(parseInt(data.totalResults, 10));
                        this.movies.set(data.Search);
                        this.totalResults.set(parseInt(data.totalResults, 10));
                    } else {
                        // case where movie not found
                        this.errorMessage.set("Movie not found.");
                        this.totalResults.set(0);
                    }
                },
            })
            // data => {
            // returns MovieDetails[]
            // console.log(data.totalResults);
            // this.movies.set(data.Search);
            // this.totalResults.set(parseInt(data.totalResults));
            // console.log(this.movies());
        
    }

    nextPage() {
        // can never be grater than maxPages
        if (this.currentPage() < this.maxPages()) {
            
            this.currentPage.update((page) => page + 1);
            console.log(this.currentPage());
            // fetch using remembered search terms
            this.getMovies(this.currentSearchTerm(), this.currentPage());
        }
    }

    previousPage() {
        if (this.currentPage() <= 1) {
            this.currentPage.update((page) => page - 1);
            this.getMovies(this.currentSearchTerm(), this.currentPage());
        }
    }

    customPage(page: number) {
        if (this.currentPage() !== 0) {
            this.currentPage.update((value) => value = page);
            this.getMovies(this.currentSearchTerm(), this.currentPage());
        }
    }
}
