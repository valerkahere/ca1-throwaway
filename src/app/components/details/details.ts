import { Component, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieapiService } from '../../services/movieapi-service';



@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})

export class Details {
   movieService = inject(MovieapiService);
   protected id = input<string>();

   // view details button attached with an event listener
   // so when it is clicked, the search by movie id is performed

   // need a way of deciding if rendering a list or single movie for details component
   // by page url?

//    constructor() {
//     // effect(). This is "reactive," meaning it will wait until the id actually has a value and then run automatically whenever that id changes.
//     effect(() => {
//         const movieID = this.id();
//         if (movieID) {
//             this.movieService.getMovie(movieID);
//         }
//     })
//    }
}
