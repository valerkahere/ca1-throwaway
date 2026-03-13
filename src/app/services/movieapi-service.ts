import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { MovieDetails } from '../models/moviedetails.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieapiService {
    
    public movie = signal<MovieDetails | null>(null);

    private _baseURL = "https://www.omdbapi.com/";
    private _API_KEY = "?apikey=e42e477d&t=";

    // _http is built during object creation without initializing
    //  It automatically creates a class property named _http and assigns the injected instance to it, so you can use it later as this._http.
    constructor(private _http:HttpClient) {}

    private handleError(err:HttpErrorResponse) {
        console.log(`OmdbApiService ${err.message}`)
        return throwError(() => new Error(`OmdbApiService: ${err.message}`))
    }

    // the return value is observable of type MovieDetails
    getMovie(movieName: string):Observable<MovieDetails> {
        const fullURL = `${this._baseURL}${this._API_KEY}&t=${movieName}`
        
        return this._http.get<MovieDetails>(fullURL)
        .pipe( // pipe chain multiples operators together. Takes observable, returns transformte
            // tap - Performs Side Effects: Use it for actions that don't change the data, such as logging to the console, triggering analytics, or updating an external variable.
            tap(data => console.log("Moviedata/error" + JSON.stringify(data))
        ),
            catchError(this.handleError)
        )
        
        
    }
}
