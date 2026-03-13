import { Component, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieapiService } from '../../services/movieapi-service';



@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
// this is to display default "try searching for a movie"
export class Details {
   movieService = inject(MovieapiService);
   protected id = input<string>();

   constructor() {
    // effect(). This is "reactive," meaning it will wait until the id actually has a value and then run automatically whenever that id changes.
    effect(() => {
        const movieID = this.id();
        if (movieID) {
            this.movieService.getMovie(movieID);
        }
    })
   }
}
