import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-about',
  imports: [
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
