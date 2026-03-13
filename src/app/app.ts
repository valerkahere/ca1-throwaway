import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { MovieapiService } from './services/movieapi-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    title = signal("Movie Finder");
     constructor(public movieApiService:MovieapiService) {
            
        }
        
}
