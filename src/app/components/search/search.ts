import { Component, signal } from '@angular/core';
import { MovieapiService } from '../../services/movieapi-service';
import { MovieDetails } from '../../models/moviedetails.interface';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
    // movieData = signal<MovieDetails | undefined>(undefined);
    // 

    constructor(private _movieApiService:MovieapiService) {}

    getMovieDetails(movieName:string) : boolean {
        //The first function passed to the subscribe method specifies the action to take whenever the observable emits an item.
        this._movieApiService.getMovie(movieName).subscribe(
            movieData => {
                // This code then sets the service's movie signal to the returned data.
                this._movieApiService.movie.set(movieData);
            }
        )
        return false;
    }
}
