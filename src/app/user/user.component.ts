import { Component, EventEmitter, inject, OnInit, Output,  ChangeDetectorRef } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  usersList: User[];
  constructor( private cdr: ChangeDetectorRef) {
    this.usersList = [];
  }
  userService = inject(UserService);
  //Función que se usa cuando se hace click a listar usuarios
  async obtenerUsuarios() {

    //Usa getUsers() del servicio UserService para hacer la peticion get a la API de todos los usuarios
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        //se añaden los usuarios recibidos por la peticion getUsers() a la lista de usuarios
        this.usersList = users;
        console.log(this.usersList, this.usersList.length);
        this.cdr.detectChanges();
        if (this.usersList.length > 0) {
          console.log(this.usersList[0].name); // Ahora no dará error
        }

      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
  trackByUserId(index: number, user: any): number {
    return user.id;
  }

}
