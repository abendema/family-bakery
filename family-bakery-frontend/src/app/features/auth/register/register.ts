import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private formBuilder = inject(FormBuilder);

  showPassword = false;
  showConfirmPassword = false;

  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  registerForm = this.formBuilder.group(
    {
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8)]],

      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.statusMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      this.statusType = 'error';
      this.statusMessage = 'Please check the highlighted fields.';

      return;
    }

    this.statusType = 'success';

    this.statusMessage =
      'Your details passed validation. Account creation will be connected to the backend.';
  }
}
