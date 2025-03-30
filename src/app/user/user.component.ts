import { Component, EventEmitter, inject, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserPackagesComponent } from '../user-packages/user-packages.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, MatPaginatorModule, UserPackagesComponent],
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

  mostrarModal = false; // Controla la visibilidad del modal
  paquetesSeleccionados: any[] = []; // Almacena los paquetes del usuario seleccionado

  constructor(private cdr: ChangeDetectorRef) {
    this.usersList = [];
  }

  userService = inject(UserService);

  // Función que se usa cuando se hace click a listar usuarios
  async obtenerUsuarios() {
    // Usa getUsers() del servicio UserService para hacer la petición GET a la API de todos los usuarios
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        // Se añaden los usuarios recibidos por la petición getUsers() a la lista de usuarios
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
    console.log(usuario.seleccionado);
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
      this.eliminarUsuarios(usuariosSeleccionados, 1);
    }
  }

  eliminarUsuarios(usuariosSeleccionados: any[], opcion: number): void {
    usuariosSeleccionados.forEach(usuario => {
      if (opcion == 1) {
        this.userService.deleteUsuario(usuario._id).subscribe({
          next: () => {
            console.log(`Usuario con ID ${usuario._id} eliminado.`);
            this.usersList = this.usersList.filter(u => u._id !== usuario._id); // Eliminamos el usuario de la lista local
          },
          error: (error) => {
            console.error(`Error al eliminar el usuario con ID ${usuario._id}:`, error);
          }
        });
      } else if (opcion === 2) {
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
      this.eliminarUsuarios(usuariosSeleccionados, 2);
    }
  }



  verPaquetes(usuario: User): void {
    console.log('Usuario seleccionado:', usuario); // Verifica que el método se está llamando
    this.userService.getPaquetesUsuario(usuario._id!).subscribe({
      next: (paquetes) => {
        console.log('Paquetes obtenidos del backend:', paquetes); // Verifica los datos obtenidos
        this.paquetesSeleccionados = paquetes; // Asigna los paquetes obtenidos
        this.mostrarModal = true; // Muestra el modal
      },
      error: (error) => {
        console.error('Error al obtener los paquetes:', error); // Verifica si hay un error
      }
    });
  }

cerrarModal(): void {
  this.mostrarModal = false; // Oculta el modal
}
}