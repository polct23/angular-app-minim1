import { Component } from '@angular/core';
import { LeftBoxComponent } from "./left-box/left-box.component";
import { HeaderComponent } from "./header/header.component";
@Component({
  selector: 'app-root',
  imports: [LeftBoxComponent, HeaderComponent],
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
