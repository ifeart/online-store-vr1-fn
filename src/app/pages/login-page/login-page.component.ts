import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  dynamicTitleService = inject(DynamicTitleService);
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.dynamicTitleService.setNewTitle('Вход в аккаунт');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.router.navigate(['/account']);
          
          // console.log('Login successful:', response);
        },
        error => console.error('Login error:', error)
      );
    }
  }
}
