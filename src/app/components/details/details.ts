import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieapiService } from '../../services/movieapi-service';



@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
// this is to display default "try searching for a movie"
export class Details {
   movieService = inject(MovieapiService);


}
