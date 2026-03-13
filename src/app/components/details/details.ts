import { Component, inject } from '@angular/core';
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


}
