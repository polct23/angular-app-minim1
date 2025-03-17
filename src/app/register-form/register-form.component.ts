import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { PacketService } from '../services/packet.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  standalone: true
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  packetForm: FormGroup;
  activeTab: 'user' | 'packet' = 'user'; // Control de pestañas

  constructor(private fb: FormBuilder, private userService: UserService, private packetService: PacketService) {
    // Formulario de Usuario
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      phone: [''],
      packets: ['']
    });

    // Formulario de Paquete
    this.packetForm = this.fb.group({
      name: [''],
      description: [''],
      status: ['']
    });
  }

  // ✅ Este método estaba faltando, lo agregamos aquí:
  setActiveTab(tab: 'user' | 'packet') {
    this.activeTab = tab;
  }

  // Enviar formulario de usuario
  registerUser() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario exitoso:', response);
          
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error en el usuario, verifica tus credenciales');
        }
      });
    }
  }

  // Enviar formulario de paquete
  registerPacket() {
    if (this.packetForm.valid) {
      const packetData = this.packetForm.value;
        this.packetService.createPacket(packetData).subscribe({
          next: (response) => {
            console.log('Paquete exitoso:', response);
            
          },
          error: (error) => {
            console.error('Error en el login:', error);
            alert('Error en el paquete, verifica tus credenciales');
          }
      });
    }
  }
}
