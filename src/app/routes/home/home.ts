import { Component } from '@angular/core';
import { Search } from "../../components/search/search";
import { Details } from '../../components/details/details';

@Component({
  selector: 'app-home',
  imports: [Search, Details],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
