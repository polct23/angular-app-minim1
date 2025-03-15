import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-left-box',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './left-box.component.html',
  styleUrl: './left-box.component.css'
})
export class LeftBoxComponent {

}
