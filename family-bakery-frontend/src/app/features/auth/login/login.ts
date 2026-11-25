import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private formBuilder = inject(FormBuilder);

  showPassword = false;

  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],

    password: [
      '',
      [Validators.required, Validators.minLength(8)],
    ],
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    this.statusMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.statusType = 'error';
      this.statusMessage = 'Please check the highlighted fields.';

      return;
    }

    this.statusType = 'success';

    this.statusMessage =
      'Your details passed validation. Backend authentication is not connected yet.';
  }

}