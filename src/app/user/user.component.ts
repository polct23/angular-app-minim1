import { Component, EventEmitter, inject, OnInit, Output,  ChangeDetectorRef } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerUsuarios();

  }
  usuarioSeleccionado: User = new User();
  usersList: User[] = [];
  displayedUsers: User[] = [];
  totalItems = 0;
  itemsPerPage = 3;
  currentPage = 0;

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
        this.usersList = users.map(user => ({
          ...user,
          seleccionado: false // Inicializa la propiedad seleccionado
        }));
        this.totalItems = this.usersList.length;
        this.updateDisplayedUsers();
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
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedUsers = this.usersList.slice(start, end);
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
  toggleSeleccion(usuario: User): void {
    usuario.seleccionado = !usuario.seleccionado;
  }
  confirmarEliminacion(): void {
    const usuariosSeleccionados = this.usersList.filter(usuario => usuario.seleccionado); // Filtra los usuarios seleccionados
    console.log('Usuarios seleccionados:', usuariosSeleccionados);
    if (usuariosSeleccionados.length === 0) {
      alert('No hay usuarios seleccionados para eliminar.');
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar ${usuariosSeleccionados.length} usuario(s)?`);
    if (confirmacion) {
      this.eliminarUsuarios(usuariosSeleccionados,1);
    }
  }
  eliminarUsuarios(usuariosSeleccionados: any[], opcion: number): void {
    usuariosSeleccionados.forEach(usuario => {
      if(opcion==1){
      this.userService.deleteUsuario(usuario._id).subscribe({
        next: () => {
          console.log(`Usuario con ID ${usuario._id} eliminado.`);
          this.usersList = this.usersList.filter(u => u._id !== usuario._id); // Eliminamos el usuario de la lista local
        },
        error: (error) => {
          console.error(`Error al eliminar el usuario con ID ${usuario._id}:`, error);
        }
      });
    }
    else if(opcion==2){
      this.userService.deactivateUsuario(usuario._id, usuario).subscribe({
        next: () => {
          console.log(`Usuario con ID ${usuario._id} eliminado.`);
         
        },
        error: (error) => {
          console.error(`Error al eliminar el usuario con ID ${usuario._id}:`, error);
        }
      });

    }

    });
    

}
desactivarUsuarios(): void {
  const usuariosSeleccionados = this.usersList.filter(usuario => usuario.seleccionado); // Filtra los usuarios seleccionados
  console.log('Usuarios seleccionados:', usuariosSeleccionados);
  if (usuariosSeleccionados.length === 0) {
    alert('No hay usuarios seleccionados para eliminar.');
    return;
  }

  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar ${usuariosSeleccionados.length} usuario(s)?`);
  if (confirmacion) {
    this.eliminarUsuarios(usuariosSeleccionados,2);
  }
}
}
