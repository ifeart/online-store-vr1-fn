import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    phone_number: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.authService.signup(this.signupForm.value).subscribe(
        response => {
          this.router.navigate(['/account']);
          
          console.log('Signup successful:', response)},
        error => console.error('Signup error:', error)
      );
    }
  }  
}
