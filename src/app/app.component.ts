import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
  loggedIn = false;
  getLoggedIn(loggedIn: boolean) {
    alert(loggedIn);
    this.loggedIn = loggedIn;
  }
}
