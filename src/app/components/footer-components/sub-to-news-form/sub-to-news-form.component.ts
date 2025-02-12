import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sub-to-news-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sub-to-news-form.component.html',
  styleUrl: './sub-to-news-form.component.scss'
})
export class SubToNewsFormComponent implements OnInit {
  authService =  inject(AuthService);
  subscribedToNews: boolean = false;
  
  subToNewsForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  
  
  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.subscribedToNews = !status;
    });
  }

  onSubmit() {
    if (this.subToNewsForm.valid) {
      console.log(this.subToNewsForm.value.email);
      this.subscribedToNews = true;
    }
  }
}
