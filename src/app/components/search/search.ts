import { Component } from '@angular/core';
import { MovieapiService } from '../../services/movieapi-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
    // movieData = signal<MovieDetails | undefined>(undefined);
    // 

    constructor(public movieApiService:MovieapiService) {}

    getMovieDetails(movieName:string) : boolean {
        //The first function passed to the subscribe method specifies the action to take whenever the observable emits an item.
        this.movieApiService.getMovie(movieName).subscribe(
            movieData => {
                // This code then sets the service's movie signal to the returned data.
                this.movieApiService.movie.set(movieData);
            }
        )
        return false;
    }
}
