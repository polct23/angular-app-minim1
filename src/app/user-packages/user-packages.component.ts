import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-packages.component.html',
  styleUrls: ['./user-packages.component.css']
})
export class UserPackagesComponent {
  @Input() paquetes: any[] = []; // Recibe los paquetes desde el componente padre
  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal

  cerrar(): void {
    this.close.emit(); // Emite el evento de cierre
  }
}