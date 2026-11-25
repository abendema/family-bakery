import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private formBuilder = inject(FormBuilder);

  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    this.statusMessage = '';

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();

      this.statusType = 'error';
      this.statusMessage = 'Please check the highlighted fields.';

      return;
    }

    this.statusType = 'success';

    this.statusMessage = 'Email looks valid. Password reset will be handled by the backend.';
  }
}
