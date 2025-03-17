import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftBoxComponent } from "./left-box/left-box.component";
import { RegisterButtonComponent } from './register-button/register-button.component';
import { RegisterFormComponent } from './register-form/register-form.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftBoxComponent, RegisterButtonComponent, RegisterFormComponent],
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
