import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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

    getMovies(title: string) {
        const fullURL = `${this._baseURL}${this._API_KEY}&s=${title}`;
        this._http.get<SearchResults>(fullURL)
        .pipe(
            take(1)
        )
        .subscribe(data => {
            // returns MovieDetails[]
            this.movies.set(data.Search);
            console.log(this.movies());
        })
    }
}
