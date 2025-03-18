import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-register-button',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register-button.component.html',
  styleUrl: './register-button.component.css'
})
export class RegisterButtonComponent {

}
