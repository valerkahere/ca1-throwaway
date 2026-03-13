import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from './components/search/search';
import { Details } from './components/details/details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search, Details],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    title = signal("Movie Finder");
  
}
