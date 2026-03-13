import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieapiService } from '../../services/movieapi-service';



@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
   movieService = inject(MovieapiService);

}
