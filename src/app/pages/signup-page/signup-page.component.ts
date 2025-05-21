import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';


@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  dynamicTitleService = inject(DynamicTitleService);
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    phone_number: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.dynamicTitleService.setNewTitle('Регистрация в ife.SHOP');
  }

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
