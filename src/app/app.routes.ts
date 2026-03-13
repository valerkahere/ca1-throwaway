import { Routes } from '@angular/router';
import { Home } from './routes/home/home';
import { About } from './routes/about/about';
import { Details } from './components/details/details';

export const routes: Routes = [
    { path: "", component: Home},
    { path: "about", component: About},
    { path: "movie/:id", component: Details},

    
];
