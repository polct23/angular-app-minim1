import { Component } from '@angular/core';
import { GamesComponent } from '../games/games.component';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-user',
  imports: [GamesComponent, HomeComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username = 'Max';
  isLoggedIn = false;

  greet()
  {
    alert('Hello ' + this.username);
  }
}
