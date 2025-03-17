import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
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

  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      phone: [''],
      packets: ['']
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.userService.createUser(userData).subscribe(response => {
        console.log('Usuario registrado:', response);
      });
    }
  }
  
}
