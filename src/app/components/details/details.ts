import { Component, inject, input } from '@angular/core';
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
   protected id = input.required<string>();

   ngOnInit() {
    let movieID = this.id();
    this.movieService.getMovie(movieID);
   }

}
